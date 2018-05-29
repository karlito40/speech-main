import BaseGate from "../../common/gate/BaseGate";

export default class ShowConversationFriendGate extends BaseGate {

  async isAuthorized() {
    // return new Promise<boolean>((resolve) => {
    //   setTimeout(() => resolve(true), 1000);
    // });

    return true;
  }
}