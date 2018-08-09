import bootstrap from "../../src/bootstrap";
import { getRepository } from "typeorm";
import { User } from "../../src/entities/User";
import assert from "assert";
import faker from "faker";
import { validate } from "class-validator";
import { createEntity } from "../../src/lib/entity";
import { log } from "../../src/lib/logger";
import { inspect } from "util";

let app, userRepository;
beforeAll(async () => {
  app = await bootstrap();
  userRepository = getRepository(User);
  return;
});

describe("User", () => {
  it("should be able to create and update a user", async (done) => {
    const user = new User();
    await user.setAsyncPassword("test-password");
    user.pseudo = faker.internet.userName();
    user.email = faker.internet.email();

    const errors = await validate(user);
    assert.ok(!errors.length, inspect(errors));

    const insertedUser = await userRepository.save(user);
    assert.equal(user.email, insertedUser.email);
    assert.ok(await insertedUser.comparePassword("test-password"));
    assert.ok(insertedUser.createdAt, inspect(insertedUser));
    assert.ok(insertedUser.updatedAt, inspect(insertedUser));

    const updatedAt = insertedUser.updatedAt;
    insertedUser.pseudo = faker.internet.userName();
    const updatedUser = await userRepository.save(user);
    assert.ok(updatedUser.updatedAt != updatedAt);

    done();
  });

  it("should return an array of error", async (done) => {
    // invalid email + invalid pseudo
    const user = createEntity(User, {
      email: "invalidemail",
      password: "totototo",
    });
    const errors = await validate(user);
    assert.ok(errors.length > 0);

    done();
  });

  it("should return an error with an invalid email", async (done) => {
    let user = createEntity(User, {
      email: "invalidemail",
      pseudo: "pseudo",
      password: "totototo",
    });
    let errors = await validate(user);
    assert.equal(errors.length, 1, inspect(errors));

    user = createEntity(User, {
      pseudo: "pseudo",
      password: "totototo",
    });
    errors = await validate(user);
    assert.equal(errors.length, 1, inspect(errors));

    done();
  });

  it("should return an error with a bad pseudo", async (done) => {
    let user = createEntity(User, {
      email: "toto@toto.com",
      password: "totototo",
    });
    let errors = await validate(user);
    assert.equal(errors.length, 1, inspect(errors));

    user = createEntity(User, {
      email: "toto@toto.com",
      pseudo: "12",
      password: "totototo",
    });
    errors = await validate(user);
    assert.equal(errors.length, 1);

    user = createEntity(User, {
      email: "toto@toto.com",
      pseudo: "123",
      password: "totototo",
    });
    errors = await validate(user);
    assert.ok(!errors.length, inspect(errors));

    done();
  });

  it("should return an error with a duplicate pseudo or email", async (done) => {
    const user = createEntity(User, {
      password: "test-password",
      pseudo: faker.internet.userName(),
      email: faker.internet.email()
    });

    const insertedUser = await userRepository.save(user);

    const userError = createEntity(User, {
      password: "test-password",
      pseudo: user.pseudo,
      email: user.email
    });

    const errors = await validate(userError);
    assert.equal(errors.length, 2, inspect(errors));
    done();
  });

});