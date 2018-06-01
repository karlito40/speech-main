import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { getRepository } from "typeorm";
import { isAuthenticated } from "../auth/decorators";
import BaseController from "./BaseController";

export default class Controller extends BaseController {

  async index() {
    return this.json({ version: process.env.API_VERSION });
  }

  async notFound() {
    return this.res.status(404).json({
      success: false,
      message: "RESOURCE_NOT_FOUND"
    });
  }
}
