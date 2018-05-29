import passport from "passport";
import { User } from "../entity/User";
import { replace } from "../util/string";
import GateManager from "../common/gate/GateManager";
import { isScopeAuthorized } from "../policies";

export function isAuthenticated(...originalScopes) {
  originalScopes = [...originalScopes, "super-admin"];
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...originalArgs) {
      const self = this;

      return passport.authenticate("jwt", { session: false }, async function(err: Error, user: User, info) {
        if (err || !user) {
          return self.res.status(400).json({
            message: (info) ? info.message : "Token unauthorized",
          });
        }

        const placeholderMap = {...self.req.query, ...{ me: user.id }};
        const scopesRef = originalScopes.map(scope => replace(scope, placeholderMap));

        if (! await isScopeAuthorized(scopesRef, self.req, user)) {
          return self.res.status(400).json({
            message: "Invalid scope",
          });
        }

        self.req.login(user, { session: false }, (err: Error) => {
          if (err) {
            return this.res.status(400).json({
              message: "Unable to log the user",
            });
          }
          originalMethod.apply(self, originalArgs);
        });
      })(self.req, self.res, self.next);
    };

    return descriptor;
  };
}