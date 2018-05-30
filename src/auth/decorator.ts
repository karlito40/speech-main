import passport from "passport";
import { User } from "../entity/User";
import { isScopesAuthorized } from "../policies";

export function isAuthenticated(...scopes) {
  scopes = [...scopes, "super-admin"];
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...originalArgs) {
      const self = this;

      return passport.authenticate("jwt", { session: false }, async function(err: Error, user: User, info) {
        if (err || !user) {
          return self.res.status(400).json({
            message: (info) ? info.message : "Token unauthorized",
            info: info
          });
        }

        let isAuthorized = false;
        try {
          isAuthorized = await isScopesAuthorized(scopes, self.req, user);
        } catch (err) {
          return self.res.status(400).json({
            message: "Scope error",
          });
        }

        if (!isAuthorized) {
          return self.res.status(400).json({
            message: "Invalid scope",
          });
        }

        self.req.login(user, { session: false }, (err) => {
          if (err) {
            return self.res.status(400).json({
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