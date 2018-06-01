import { ucFirst } from "../lib/string";

export class BaseEntity {
  fillable = [];
  hidden = [];

  isFillable(property) {
    return this.fillable.includes(property);
  }

  async fill(property, value) {
    const ucFirstProperty = ucFirst(property);
    const setAsync = `setAsync${ucFirstProperty}`;
    const set = `set${ucFirstProperty}`;

    if (this[setAsync]) {
      return this[setAsync](value);
    } else if (this[set]) {
      return this[set](value);
    }

    return this[property] = value;
  }

  toJSON() {
    const result = Object.assign({}, this);
    delete result.hidden;
    delete result.fillable;
    for (const property of this.hidden) {
      delete result[property];
    }
    return result;

  }

}