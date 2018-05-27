import { Response, Request } from "express";

/**
 * GET /api
 * List of API examples.
 */
export async function getApi(req: Request, res: Response) {
  res.send("toto");
}
