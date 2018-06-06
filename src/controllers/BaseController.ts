import { Response, Request, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import { logError } from "../lib/logger";
import { isProduction } from "../lib/env";
import { Route } from "../lib/routes";
import { page } from "../lib/pagination";

export default class Controller {

  constructor(
    protected req: Request,
    protected res: Response,
    protected next: NextFunction,
    protected route: Route) {
      this.boot();
  }

  boot() {}

  async paginate(repository, options?) {
    const result = await page(repository, this.req.query.page, options);
    return this.res.json({
      success: true,
      data: result.data || null,
      meta: {
        total: result.total,
        per_page: result.perPage,
        last_page: result.lastPage,
      }
    });
  }

  json(data, success: boolean = true) {
    return this.res.json({
      success: success,
      data: data || null,
    });
  }

  error(err: Error, toReturn, message: string = "An error occured", status: number = 400) {
    if (typeof toReturn != "object") {
      toReturn = { code: toReturn, message };
    }

    logError.apply(null, [ ...[toReturn.code, err] ]);
    return this.res.status(status).json({
      success: false,
      error: toReturn
    });
  }

  internalError(err: Error, code, message: string = "Internal server error", status: number = 500) {
    return this.error(err, code, message, 500);
  }

}

