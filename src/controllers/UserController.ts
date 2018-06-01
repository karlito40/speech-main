import passport from "passport";
import { User } from "../entities/User";
import BaseController from "./BaseController";
import { isAuthenticated } from "../auth/decorators";
import { getRepository, Repository } from "typeorm";
import { page } from "../lib/pagination";
import { saveEntity } from "../lib/entity";

export default class UserController extends BaseController {
  protected repository: Repository<User>;

  boot() {
    this.repository = getRepository(User);
  }

  @isAuthenticated("show-users", "show-user-:id")
  async get() {
    const { id } = this.req.params;
    return this.json(await this.repository.findOne(id));
  }

  @isAuthenticated("show-users")
  async list() {
    return this.paginate(await page(this.repository, this.req.query.page));
  }

  @isAuthenticated("create-user")
  async create() {
    const { entity, errors } = await saveEntity(User, this.req.body);
    if (errors.length) {
      return this.json({ errors }, false);
    }

    return this.json(entity);
  }

  @isAuthenticated("create-user", "update-user", "update-user-:id")
  async update() {
    const { entity, errors } = await saveEntity(User, this.req.body, this.req.params.id);
    if (errors.length) {
      return this.json({ errors }, false);
    }

    return this.json(entity);
  }
}
