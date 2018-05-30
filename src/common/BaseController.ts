import { Response, Request, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import { logError } from "../util/logger";
import { isProduction } from "../util/env";
import { Route } from "./route";
export default class Controller {

  constructor(
    protected req: Request,
    protected res: Response,
    protected next: NextFunction,
    protected route: Route) {

  }

  json(data) {
    return this.res.json({
      success: true,
      data: data
    });
  }

  error(err: Error, code, message: string = "An error occured", ...extras) {
    logError.apply(null, [ ...[code, err], ...extras ]);
    return this.res.status(400).json({
      success: false,
      message: message,
      error: {
        code: code,
      },
      data: null
    });
  }

}
