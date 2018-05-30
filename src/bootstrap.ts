import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import routes from "./routes";
import dotenv from "dotenv";
import passport from "passport";
import bootstrapAuth from "./auth/passport";
import "reflect-metadata";

if (process.env.NODE_ENV == "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config({ path: ".env" });
}

export default () => {
  return createConnection().then(connection => {
    const app = express();

    const auth = bootstrapAuth();

    app.set("port", process.env.PORT || 3100);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(auth.initialize());

    routes.initialize(app);

    return app;
  });
};

