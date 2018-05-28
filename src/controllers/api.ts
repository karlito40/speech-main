import { Response, Request, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import { isAuthenticated } from "../auth/decorator";

export default class Controller {
  req: Request;
  res: Response;
  next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async getApi() {
    this.res.send("api v1");
  }

  async postLogin() {
    passport.authenticate("local", { session: false }, (err: Error, user: User, info: IVerifyOptions) => {
      if (err || !user) {
        return this.res.status(400).json({
          message: (info) ? info.message : "Login failed",
          user: user
        });
      }

      this.req.login(user, { session: false }, (err: Error) => {
        if (err) {
          return this.res.status(400).json({
            message: "Unable to log the user",
            user: user
          });
        }

        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY);
        return this.res.json({ user, token });
      });
    })(this.req, this.res, this.next);
  }

  async postUser() {

  }

  async getConversation() {

  }

  @isAuthenticated("conversations", "user-:me-conversation", "conversation-:fromId-:toId")
  async getUsers() {
    const userRepository = getRepository(User);
    try {
      const users = await userRepository.find();
      return this.res.json({ data: users });
    } catch (err) {
      return this.res.status(400).json({
        error: "An error occured",
        data: null
      });
    }
  }
}
