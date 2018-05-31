import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { getRepository } from "typeorm";
import { isAuthenticated } from "../auth/decorator";
import BaseController from "../common/BaseController";

export default class Controller extends BaseController {

  async getApi() {
    this.res.send("api v1");
  }

  async postUser() {

  }

  async getConversation() {

  }

}
