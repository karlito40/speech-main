import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import BaseController from "./BaseController";

export default class TokenController extends BaseController {

  async token() {
    passport.authenticate("local", { session: false }, (err: Error, user: User, info) => {
      if (err || !user) {
        return this.error(err, "LOGIN_AUTH_1", info.message);
      }

      this.req.login(user, { session: false }, (err: Error) => {
        if (err) {
          return this.error(err, "LOGIN_AUTH_2");
        }

        const options = !user.hasScope(["super-admin"]) ? { expiresIn: "30d" } : null;
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, options);
        return this.res.json({ user, token });
      });
    })(this.req, this.res, this.next);
  }

}
