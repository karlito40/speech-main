
import { validate } from "class-validator";
import { getRepository, getMetadataArgsStorage, PromiseUtils } from "typeorm";
import { getManager, getConnection } from "typeorm";
import { BaseEntity } from "../entities/BaseEntity";

export function createEntity(Entity, data) {
  const entity = new Entity();
  for (const [key, value] of Object.entries(data)) { /* tslint:disable */
    entity[key] = value;
  }

  return entity;
}


export async function saveEntity(entityOrClass, inputs: Object, id?: number) {
  // const { propertiesMap } = getConnection().getMetadata(EntityClass);
  let repository;
  let entity = entityOrClass;
  if(entityOrClass instanceof BaseEntity) {
    repository = getRepository(entity.constructor.name);
  } else {
    repository = getRepository(entityOrClass);
    entity = new entityOrClass();
    if(id) {
      entity = await repository.findOneOrFail(id);
    }
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