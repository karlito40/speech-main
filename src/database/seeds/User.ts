import { User } from "../../entities/User";
import { getRepository } from "typeorm";
import faker from "faker";

export default async () => {
  const userRepository = getRepository(User);

  let user;
  for (let i = 0; i < 100; i++) {
    user = new User();
    await user.setPassword("test-password");
    user.pseudo = faker.internet.userName();
    user.email = faker.internet.email();
    user = await userRepository.save(user);
    console.log(`User ${i} has been created`);
  }

  return true;
};