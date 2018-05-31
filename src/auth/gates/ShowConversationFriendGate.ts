import { BaseGate } from "../../lib/gates/BaseGate";

export default class ShowConversationFriendGate extends BaseGate {

  async isAuthorized() {
    // return new Promise<boolean>((resolve) => {
    //   setTimeout(() => resolve(true), 1000);
    // });

    return true;
  }
}