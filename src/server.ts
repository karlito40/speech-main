import errorHandler from "errorhandler";
import logger from "./util/logger";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { AppRoutes } from "./routes";
import dotenv from "dotenv";
import passport from "passport";
import bootstrapAuth from "./auth/passport";
import "reflect-metadata";

dotenv.config({ path: ".env" });

createConnection().then(connection => {
  const app = express();

  const auth = bootstrapAuth();

  app.set("port", process.env.PORT || 3100);
  app.use(errorHandler());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(auth.initialize());

  AppRoutes.forEach(route => {
    const middlewares = (route.middlewares) ? route.middlewares : (req, res, next) => { next(); };
    app[route.method](route.path, middlewares, (request: Request, response: Response, next: NextFunction) => {
      route.action(request, response, next);
    });
  });

  app.listen(app.get("port"), () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
  });

}).catch(error => logger.error(error));

