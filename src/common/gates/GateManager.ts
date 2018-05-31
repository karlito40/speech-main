import BaseGate from "./BaseGate";

export default class GateManager {
  gates: Array<BaseGate>;

  constructor() {
    this.gates = [];
  }

  add(gate: BaseGate) {
    this.gates.push(gate);
  }

  async isAuthorized() {
    for (let i = 0; i < this.gates.length; i++) {
      if (!await this.gates[i].isAuthorized()) {
        return false;
      }
    }
    return true;
  }

}
