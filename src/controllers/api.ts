import { Response, Request, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { getRepository } from "typeorm";

export async function getApi(req: Request, res: Response, next: NextFunction) {
  res.send("api v1");
}

export async function postLogin(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("local", { session: false }, (err: Error, user: User, info: IVerifyOptions) => {
    if (err || !user) {
      return res.status(400).json({
        message: (info) ? info.message : "Login failed",
        user: user
      });
    }

    req.login(user, { session: false }, (err: Error) => {
      if (err) {
        return res.status(400).json({
          message: "Login failed while saving",
          user: user
        });
      }

      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY);
      return res.json({ user, token });
    });
  })(req, res, next);
}

export async function postUser(req: Request, res: Response, next: NextFunction) {

}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  const userRepository = getRepository(User);
  try {
    const users = await userRepository.find();
    return res.json({ data: users });
  } catch (err) {
    return res.status(400).json({
      error: "An error occured",
      data: null
    });
  }

}