import passport from "passport";
import { User } from "../entities/User";
import { isScopesAuthorized } from "../policies";

export function isAuthenticated(...scopes) {
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...originalArgs) {
      const self = this;

      return passport.authenticate("jwt", { session: false }, async function(err: Error, user: User, info) {
        if (err || !user) {
          return self.error(err, (err) ? "AUTHENTICATED_TOKEN " : info.name);
        }

        let isAuthorized = user.hasRole(["super-admin"]);
        if (!isAuthorized) {
          try {
            isAuthorized = await isScopesAuthorized(scopes, self.req, user);
          } catch (err) {
            return self.error(err, "AUTHENTICATED_SCOPE");
          }
        }

        if (!isAuthorized) {
          return self.error(null, "ACCESS_FORBIDDEN");
        }

        self.req.login(user, { session: false }, (err) => {
          if (err) {
            return self.error(err, "AUTHENTICATED_LOGIN");
          }

          originalMethod.apply(self, originalArgs);
        });
      })(self.req, self.res, self.next);
    };

    return descriptor;
  };
}