import passport from "passport";
import { User } from "../entities/User";
import { isScopesAuthorized } from "../policies";

export function isAuthenticated(...scopes) {
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...originalArgs) {
      const self = this;

      return new Promise<any>( (resolve, reject) => {
        passport.authenticate("jwt", { session: false }, async function(err: Error, user: User, info) {
          if (err || !user) {
            return resolve(self.res.status(401).json({
              success: false,
              error: {
                code: "AUTHENTICATED_TOKEN",
                message: (!err) ? info.message : err.message,
                info: info
              }
            }));
          }

          let isAuthorized = user.hasRole(["super-admin"]);
          if (!isAuthorized) {
            try {
              isAuthorized = await isScopesAuthorized(scopes, self.req, user);
            } catch (err) {
              return resolve(self.error(err, "AUTHENTICATED_SCOPE"));
            }
          }

          if (!isAuthorized) {
            return resolve(self.error(null, "ACCESS_FORBIDDEN"));
          }

          self.req.login(user, { session: false }, async (err) => {
            if (err) {
              return resolve(self.error(err, "AUTHENTICATED_LOGIN"));
            }

            try {
              return resolve(await originalMethod.apply(self, originalArgs));
            } catch (err) {
              return reject(err);
            }
          });
        })(self.req, self.res, self.next);
      });

    };

    return descriptor;
  };
}