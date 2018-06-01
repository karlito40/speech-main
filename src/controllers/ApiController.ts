import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { getRepository } from "typeorm";
import { isAuthenticated } from "../auth/decorators";
import BaseController from "./BaseController";

export default class Controller extends BaseController {

  async index() {
    this.res.send("api v1");
  }

  async notFound() {
    this.res.send("notFound");
  }


}
