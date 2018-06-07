import passport from "passport";
import { User } from "../entities/User";
import { Scope } from "../entities/Scope";
import BaseController from "./BaseController";
import { isAuthenticated } from "../auth/decorators";
import { getRepository, Repository } from "typeorm";
import { saveEntity } from "../lib/entity";
import { replace } from "../lib/string";

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
      scope.ref = replace(scopeRef, { me: user.id });
      scope.dyn = true;
      return scope;
    });

    user = await this.repository.save(user);

    return this.json({ ...entity.toJSON(), ...{ token: entity.createToken() }});
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
