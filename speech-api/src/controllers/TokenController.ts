import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import BaseController from "./BaseController";

export default class TokenController extends BaseController {

  async login() {
    passport.authenticate("local", { session: false }, (err, user: User, info) => {
      if (err || !user) {
        return this.error(err, "LOGIN_AUTH_1", info ? info.message : err.message);
      }

      this.req.login(user, { session: false }, (err) => {
        if (err) {
          return this.error(err, "LOGIN_AUTH_2");
        }

        return this.json({ ...user.toJSON(), ...{ token: user.createToken() }});
      });
    })(this.req, this.res, this.next);
  }

}
