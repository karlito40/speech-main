import bootstrap from "../../src/bootstrap";
import { getRepository } from "typeorm";
import { Scope } from "../../src/entities/Scope";
import { User } from "../../src/entities/User";
import assert from "assert";
import faker from "faker";
import { validate } from "class-validator";
import { createEntity } from "../../src/lib/entity";

let app, scopeRepository, userRepository;
beforeAll(async () => {
  app = await bootstrap();
  userRepository = getRepository(User);
  scopeRepository = getRepository(Scope);
  return;
});

describe("UserScope relations", () => {
  it("should be able to access both entities", async (done) => {
    const scope = new Scope();
    scope.ref = faker.name.firstName();

    const user = createEntity(User, {
      email: faker.internet.email(),
      pseudo: faker.internet.userName(),
      password: "totototo",
    });
    user.scopes = [scope];
    const insertedUser = await userRepository.save(user);
    assert.ok(scope.ref, insertedUser.scopes[0].ref);

    const fetchUser = await userRepository.findOne(insertedUser.id);
    assert.ok(scope.ref, fetchUser.scopes[0].ref);

    done();
  });

});