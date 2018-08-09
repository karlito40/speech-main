import { User } from "../entities/User";
import { Scope } from "../entities/Scope";
import BaseController from "./BaseController";
import { isAuthenticated } from "../auth/decorators";
import { getRepository, Repository } from "typeorm";
import { saveEntity } from "../lib/entity";
import { placeholder } from "../lib/string";

export default class UserController extends BaseController {
  protected repository: Repository<User>;

  boot() {
    this.repository = getRepository(User);
  }

  @isAuthenticated("show-users", "manage-user-self")
  async get() {
    const { id } = this.req.params;
    return this.json(await this.repository.findOne(id, { relations: ["profile", "profile.photos"]}));
  }

  @isAuthenticated()
  async getMe() {
    const user = await this.repository.findOne(this.req.user.id, { relations: [
      "profile",
      "profile.photos",
      "profile.askFor",
      "profile.askFor.to",
      "profile.askReceived",
      "profile.askReceived.from"
    ]});

    return this.json(user);
  }

  @isAuthenticated("show-users")
  async list() {
    return await this.paginate(this.repository, { relations: ["profile"] });
  }

  async create() {
    const { entity, errors } = await saveEntity(User, this.req.body);
    if (errors.length) {
      return this.error(null, errors);
    }

    let user = entity;
    const basisScopes = await getRepository(Scope).find({ dyn: false });
    const basisScopesByRef = {};
    basisScopes.forEach(scope => basisScopesByRef[scope.ref] = scope);

    user.scopes = User.givenScopes.map(scopeRef => {
      if (basisScopesByRef[scopeRef]) {
        return basisScopesByRef[scopeRef];
      }

      const scope = new Scope();
      scope.ref = placeholder(scopeRef, { me: user.id });
      scope.dyn = true;
      return scope;
    });

    user = await this.repository.save(user);

    return this.json({ ...entity.toJSON(), ...{ token: entity.createToken() }});
  }

  @isAuthenticated("manage-user", "manage-user-self")
  async update() {
    const { entity, errors } = await saveEntity(User, this.req.body, this.req.params.id);
    if (errors.length) {
      return this.error(null, errors);
    }

    return this.json(entity);
  }

}
