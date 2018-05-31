export function createEntity(Entity, data) {
  const entity = new Entity();
  for (const [key, value] of Object.entries(data)) { /* tslint:disable */
    entity[key] = value;
  }

  return entity;
}