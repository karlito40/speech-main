import passport from "passport";
import { User } from "../entity/User";
import BaseController from "../common/BaseController";
import { isAuthenticated } from "../auth/decorator";
import { getRepository, Repository } from "typeorm";

export default class UserController extends BaseController {
  protected repository: Repository<User>;

  boot() {
    this.repository = getRepository(User);
  }

  @isAuthenticated("show-users")
  async get() {
    const { id } = this.req.params;
    const userRepository = getRepository(User);
    try {
      return this.json(await userRepository.findOne(id));
    } catch (err) {
      return this.error(err, "USER_GET");
    }
  }

  @isAuthenticated("show-users")
  async paginate() {
    try {
      return this.json(await this.repository.find());
    } catch (err) {
      return this.error(err, "USER_PAGINATE");
    }
  }

}
