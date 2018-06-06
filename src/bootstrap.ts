import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import routes from "./routes";
import dotenv from "dotenv";
import passport from "passport";
import bootstrapAuth from "./auth/passport";
import { log } from "./lib/logger";
import RateLimit from "express-rate-limit";
import helmet from "helmet";
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

    app.enable("trust proxy");
    app.disable("x-powered-by");

    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(auth.initialize());
    app.use((req, res, next) => {
      log("debug", req.url);
      next();
    });
    routes.initialize(app);

    return app;
  });
};

