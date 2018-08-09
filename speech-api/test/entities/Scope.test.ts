import bootstrap from "../../src/bootstrap";
import { getRepository } from "typeorm";
import { Scope } from "../../src/entities/Scope";
import assert from "assert";
import faker from "faker";
import { validate } from "class-validator";
import { createEntity } from "../../src/lib/entity";
import { inspect } from "util";

let app, scopeRepository;
beforeAll(async () => {
  app = await bootstrap();
  scopeRepository = getRepository(Scope);
  return;
});

describe("Scope", () => {
  it("should be able to create a scope", async (done) => {
    const scope = new Scope();
    scope.ref = faker.name.firstName();

    const errors = await validate(scope);
    assert.ok(!errors.length, inspect(errors));

    const insertedScope = await scopeRepository.save(scope);
    assert.equal(scope.ref, insertedScope.ref);

    done();
  });


  it("should return an error with invalid properties", async (done) => {
    const scope = new Scope();
    scope.ref = null;

    const errors = await validate(scope);
    assert.equal(errors.length, 1, inspect(errors));

    done();
  });

  it("should return an error with a duplicate ref", async (done) => {
    const scope = new Scope();
    scope.ref = faker.name.firstName();

    const insertedScope = await scopeRepository.save(scope);

    const scopeError = createEntity(Scope, {
      ref: scope.ref,
    });

    const errors = await validate(scopeError);
    assert.equal(errors.length, 1, inspect(errors));
    done();
  });

});