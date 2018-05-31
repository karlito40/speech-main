import bootstrap from "../../src/bootstrap";
import { getRepository } from "typeorm";
import { User } from "../../src/entity/User";
import uniqid from "uniqid";
import assert from "assert";
import faker from "faker";

let app;
beforeAll(async () => {
  return app = await bootstrap();
});

describe("User", () => {
  it("should be able to create a user", async (done) => {
    const userRepository = getRepository(User);
    const user = new User();
    await user.setPassword("test-password");
    user.pseudo = faker.internet.userName();
    user.email = faker.internet.email();
    user.scopes = "test";

    const insertedUser = await userRepository.save(user);
    assert.equal(user.email, insertedUser.email);
    assert.ok(await insertedUser.comparePassword("test-password"));

    done();
  });
});