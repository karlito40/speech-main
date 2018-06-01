import fs from "fs";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import "reflect-metadata";

dotenv.config({ path: ".env" });

createConnection().then(async (connection) => {
  const files = fs.readdirSync(__dirname + "/database/seeds");
  const promises = [];
  for (const file of files) {
    if (file.endsWith(".js")) {
      promises.push(require("./database/seeds/" + file).default());
    }
  }
  await Promise.all(promises);
  console.log("Seeding completed");
  process.exit();
}). catch ((err) => console.log(err));
