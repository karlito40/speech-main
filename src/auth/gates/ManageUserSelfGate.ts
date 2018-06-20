import { BaseGate } from "../../lib/gates/BaseGate";

export default class ManageUserSelfGate extends BaseGate {

  async isAuthorized() {
    return (this.user.id == this.req.params.id);
  }
}