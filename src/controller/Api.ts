import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import { isAuthenticated } from "../auth/decorator";
import BaseController from "../common/BaseController";

export default class Controller extends BaseController {

  async getApi() {
    this.res.send("api v1");
  }

  async postLogin() {
    passport.authenticate("local", { session: false }, function(err: Error, user: User, info) {
      if (err || !user) {
        return this.error("LOGIN_AUTH_1", err, info.message, info);
      }

      this.req.login(user, { session: false }, (err: Error) => {
        if (err) {
          return this.error("LOGIN_AUTH_2", err);
        }

        const options = !user.hasScope(["super-admin"]) ? { expiresIn: "30d" } : null;
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, options);
        return this.res.json({ user, token });
      });
    })(this.req, this.res, this.next);
  }

  async postUser() {

  }

  async getConversation() {

  }

  @isAuthenticated(
    "conversations",
    "user-:me-conversation",
    "conversation-:id",
    "show-conversation-friend"
  )
  async getUsers() {
    const userRepository = getRepository(User);
    try {
      const users = await userRepository.find();
      return this.res.json({ data: users });
    } catch (err) {
      return this.error(err, "API_USERS_FIND", "test");
    }
  }
}
