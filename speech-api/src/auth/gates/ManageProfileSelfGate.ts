import { BaseGate } from "../../lib/gates/BaseGate";
import { getRepository } from "typeorm";
import { Profile } from "../../entities/Profile";

export default class ManageProfileSelfGate extends BaseGate {

  async isAuthorized() {
    if (this.options.userIdRef) {
      return this.user.id == this.req.body[this.options.userIdRef];
    }

    const profile = await getRepository(Profile).findOneOrFail(this.req.params.id, { relations: ["user"] });
    if (!profile.user) {
      return false;
    }

    return (this.user.id == profile.user.id);
  }
}