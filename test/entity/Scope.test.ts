import bootstrap from "../../src/bootstrap";
import { getRepository } from "typeorm";
import { Scope } from "../../src/entities/Scope";
import assert from "assert";
import faker from "faker";
import { validate } from "class-validator";
import { createEntity } from "../../src/lib/entity";

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
    assert.ok(!errors.length);

    const insertedScope = await scopeRepository.save(scope);
    assert.equal(scope.ref, insertedScope.ref);

    done();
  });


  it("should return an error with invalid properties", async (done) => {
    const scope = new Scope();
    scope.ref = null;

    const errors = await validate(scope);
    assert.equal(errors.length, 1);

    done();
  });

});