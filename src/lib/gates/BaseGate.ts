import { User } from "../../entities/User";
import { Request } from "express";

export abstract class BaseGate {

  constructor(
    protected req: Request,
    protected user: User,
    protected options: any) {

  }

  abstract async isAuthorized(): Promise<boolean>;
}