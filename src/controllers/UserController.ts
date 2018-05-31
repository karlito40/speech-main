import passport from "passport";
import { User } from "../entities/User";
import BaseController from "./BaseController";
import { isAuthenticated } from "../auth/decorator";
import { getRepository, Repository } from "typeorm";
import { page } from "../lib/pagination";

export default class UserController extends BaseController {
  protected repository: Repository<User>;

  boot() {
    this.repository = getRepository(User);
  }

  @isAuthenticated("show-users")
  async get() {
    const { id } = this.req.params;
    try {
      return this.json(await this.repository.findOne(id));
    } catch (err) {
      return this.error(err, "USER_GET");
    }
  }

  @isAuthenticated("show-users")
  async list() {
    try {
      // return this.paginate(await page(this.repository, this.req.query.page, { where : { pseudo: "karlito40" } }));
      return this.paginate(await page(this.repository, this.req.query.page));
    } catch (err) {
      return this.error(err, "USER_PAGINATE");
    }
  }

}
