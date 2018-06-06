import passport from "passport";
import { User } from "../entities/User";
import BaseController from "./BaseController";
import { isAuthenticated } from "../auth/decorators";
import { getRepository, Repository } from "typeorm";
import { saveEntity } from "../lib/entity";

export default class UserController extends BaseController {
  protected repository: Repository<User>;

  boot() {
    this.repository = getRepository(User);
  }

  @isAuthenticated("show-users", "show-user-:id")
  async get() {
    const { id } = this.req.params;
    return this.json(await this.repository.findOne(id, { relations: ["profile"] }));
  }

  @isAuthenticated("show-users")
  async list() {
    return await this.paginate(this.repository, { relations: ["profile"] });
  }

  async create() {
    const inputs = this.req.body;
    if (inputs.email) {
      inputs.email = inputs.email.toLowerCase();
    }

    const { entity, errors } = await saveEntity(User, inputs);
    if (errors.length) {
      return this.error(null, errors);
    }

    return this.json(entity);
  }

  @isAuthenticated("update-user", "update-user-:id")
  async update() {
    const { entity, errors } = await saveEntity(User, this.req.body, this.req.params.id);
    if (errors.length) {
      return this.error(null, errors);
    }

    return this.json(entity);
  }

}
