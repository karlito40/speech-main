import bootstrap from "../../src/bootstrap";
import { getRepository, Repository } from "typeorm";
import { Scope } from "../../src/entities/Scope";
import { User } from "../../src/entities/User";
import assert from "assert";
import faker from "faker";
import { validate } from "class-validator";
import { createEntity } from "../../src/lib/entity";
import { log } from "../../src/lib/logger";

let app, scopeRepository, userRepository: Repository<User>;
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

    const fetchUser = await userRepository.findOne(insertedUser.id, {relations: ["scopes"]});
    assert.ok(scope.ref, fetchUser.scopes[0].ref);

    done();
  });

});