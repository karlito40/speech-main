import bootstrap from "./bootstrap";
import errorHandler from "errorhandler";
import { Express } from "express";
import { logError } from "./lib/logger";

bootstrap().then((app) => {
  app.use(errorHandler());

  app.listen(app.get("port"), () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
  });
}).catch(error => logError("BOOTSTRAP", error));
