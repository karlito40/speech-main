import errorHandler from "errorhandler";
import logger from "./util/logger";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { AppRoutes } from "./routes";
import dotenv from "dotenv";
import "reflect-metadata";

dotenv.config({ path: ".env" });

createConnection().then(async connection => {
  const app = express();

  app.set("port", process.env.PORT || 3100);
  app.use(errorHandler());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  AppRoutes.forEach(route => {
      app[route.method](route.path, (request: Request, response: Response, next: Function) => {
          route.action(request, response)
              .then(() => next())
              .catch(err => next(err));
      });
  });

  app.use(() => {
    console.log("tata next");
  });

  app.listen(app.get("port"), () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
  });

}).catch(error => logger.error(error));

