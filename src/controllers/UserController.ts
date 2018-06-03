import passport from "passport";
import { User } from "../entities/User";
import { Profile } from "../entities/Profile";
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

  @isAuthenticated("create-user")
  async createProfile() {
    const user = await getRepository(User)
                        .findOneOrFail(this.req.params.id);

    const inputs = { ...this.req.body, ...{ user }};

    const { entity, errors } = await saveEntity(Profile, inputs);
    if (errors.length) {
      return this.json({ errors }, false);
    }

    return this.json(entity);
  }

  @isAuthenticated("create-user")
  async updateProfile() {
    const user = await getRepository(User)
                        .findOneOrFail(this.req.params.id, { relations: ["profile"] });

    const inputs = { ...this.req.body, ...{ user }};

    const { entity, errors } = await saveEntity(user.profile, inputs);
    if (errors.length) {
      return this.json({ errors }, false);
    }

    return this.json(entity);
  }
}
