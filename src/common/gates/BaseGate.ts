import { User } from "../../entities/User";
import { Request } from "express";

export default abstract class BaseGate {
  user: User;
  req: Request;

  constructor(req: Request, user: User) {
    this.user = user;
    this.req = req;
  }

  abstract async isAuthorized(): Promise<boolean>;
}