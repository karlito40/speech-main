import { BaseGate } from "./BaseGate";

export class GateManager {
  gates: BaseGate[];

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
