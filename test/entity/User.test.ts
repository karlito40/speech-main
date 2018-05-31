import bootstrap from "../../src/bootstrap";
import { getRepository } from "typeorm";
import { User } from "../../src/entities/User";
import uniqid from "uniqid";
import assert from "assert";
import faker from "faker";
import { validate } from "class-validator";
import { createEntity } from "../../src/utils/entities";

let app, userRepository;
beforeAll(async () => {
  app = await bootstrap();
  userRepository = getRepository(User);
  console.log("done");
  return;
});

describe("User", () => {
  it("should be able to create a user", async (done) => {
    console.log("test");
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

  it("should validate without error", async (done) => {
    // Everything is valid
    const user = createEntity(User, {
      email: "test@test.com",
      pseudo: "pseudo",
      password: "totototo",
    });
    const errors = await validate(user);
    assert.ok(!errors.length);

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
    assert.equal(errors.length, 1);

    user = createEntity(User, {
      pseudo: "pseudo",
      password: "totototo",
    });
    errors = await validate(user);
    assert.equal(errors.length, 1);

    done();
  });

  it("should return an error with a bad pseudo", async (done) => {
    let user = createEntity(User, {
      email: "toto@toto.com",
      password: "totototo",
    });
    let errors = await validate(user);
    assert.equal(errors.length, 1);

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
    assert.ok(!errors.length);

    done();
  });


});