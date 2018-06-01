
import { validate } from "class-validator";
import { getRepository, getMetadataArgsStorage, PromiseUtils } from "typeorm";
import { getManager, getConnection } from "typeorm";
import { User } from "../entities/User";

export function createEntity(Entity, data) {
  const entity = new Entity();
  for (const [key, value] of Object.entries(data)) { /* tslint:disable */
    entity[key] = value;
  }

  return entity;
}


export async function saveEntity(EntityClass, inputs: Object, id?: number) {
  // const { propertiesMap } = getConnection().getMetadata(EntityClass);
  const repository = getRepository(EntityClass);

  let entity = new EntityClass();
  if(id) {
    entity = await repository.findOneOrFail(id);
  }

  const fill = async () => {
    const promises = [];
    for (const [key, value] of Object.entries(inputs)) {
      promises.push(entity.fill(key, value));
    }

    return Promise.all(promises);
  };

  await fill();

  const errors = await validate(entity, { validationError: { target: false } });
  if (!errors.length) {
    entity = await repository.save(entity);
  }
  
  return { entity, errors };
}