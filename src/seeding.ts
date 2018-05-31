import fs from "fs";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import "reflect-metadata";

dotenv.config({ path: ".env" });

createConnection().then(async (connection) => {
  const files = fs.readdirSync(__dirname + "/database/seeds");
  for (const file of files) {
    if (file.endsWith(".js")) {
      console.log("Seeding " + file.replace(".js", "") + "...");
      await require("./database/seeds/" + file).default();
      console.log("Seeding " + file.replace(".js", "") + " end");
    }
  }

  console.log("Seeding completed");
  process.exit();
}). catch ((err) => console.log(err));
