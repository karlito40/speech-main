import { Response, Request, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import { logError } from "../lib/logger";
import { isProduction } from "../lib/env";
import { Route } from "./routes";

export default class Controller {

  constructor(
    protected req: Request,
    protected res: Response,
    protected next: NextFunction,
    protected route: Route) {
      this.boot();
  }

  boot() {}

  paginate(page, success: boolean = true) {
    return this.res.json({
      success: success,
      data: page.data || null,
      meta: {
        total: page.total,
        per_page: page.perPage,
        last_page: page.lastPage,
      }
    });
  }

  json(data, success: boolean = true) {
    return this.res.json({
      success: success,
      data: data || null,
    });
  }

  error(err: Error, code, message: string = "An error occured", ...extras) {
    logError.apply(null, [ ...[code, err], ...extras ]);
    return this.res.status(400).json({
      success: false,
      message: message,
      error: {
        code: code,
      }
    });
  }

}

