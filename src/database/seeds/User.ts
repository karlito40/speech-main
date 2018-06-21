import { User } from "../../entities/User";
import { Profile } from "../../entities/Profile";
import { getRepository } from "typeorm";
import faker from "faker";
import { saveEntity } from "../../lib/entity";

async function createUser() {
  const {entity, errors} = await saveEntity(User, {
    password: "test-password",
    email: faker.internet.email()
  });
  return entity;
}

async function createProfile(user) {
  const { entity, errors } = await saveEntity(Profile, {
    pseudo: faker.internet.userName(),
    gender: "F",
    forGender: "M",
    birthDate: "1988-11-12",
    headline: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(2),
    user
  });

  return entity;
}

export default async () => {

  for (let i = 0; i < 20; i++) {
    const user = await createUser();

    console.log(`User ${user.id} has been created`);

    const profile = await createProfile(user);

    console.log(`Profile ${profile.id} has been created`);
  }

  return true;
};