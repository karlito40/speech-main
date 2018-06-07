import passport from "passport";
import { Profile } from "../entities/Profile";
import { User } from "../entities/User";
import BaseController from "./BaseController";
import { isAuthenticated } from "../auth/decorators";
import { getRepository, Repository } from "typeorm";
import { saveEntity } from "../lib/entity";

export default class ProfileController extends BaseController {
  protected repository: Repository<Profile>;

  boot() {
    this.repository = getRepository(Profile);
  }

  @isAuthenticated("show-profiles")
  async get() {
    const { id } = this.req.params;
    return this.json(await this.repository.findOne(id));
  }

  @isAuthenticated("show-profiles")
  async list() {
    return await this.paginate(this.repository);
  }

  @isAuthenticated("create-profile")
  async create() {
    const user = await getRepository(User).findOneOrFail(this.req.body.userId, { relations: ["profile"] });
    if (user.profile) {
      return this.error(null, "PROFILE_ALREADY_DEFINED");
    }

    const inputs = { ...this.req.body, ...{ user }};
    const { entity, errors } = await saveEntity(Profile, inputs);
    if (errors.length) {
      return this.error(null, errors);
    }

    return this.json(entity);
  }

  @isAuthenticated("create-profile", "update-profile-:me")
  async update() {
    const { entity, errors } = await saveEntity(Profile, this.req.body, this.req.params.id);
    if (errors.length) {
      return this.json({ errors }, false);
    }

    return this.json(entity);
  }
}
