import { Response, Request, NextFunction } from "express";

export const action = (action: string) => {
  const [controllerName, handler] = action.split("@");
  const ControllerClass = require(`../controller/${controllerName}`).default;
  return (req: Request, res: Response, next: NextFunction) => {
    const controller = new ControllerClass(req, res, next);
    return controller[handler]();
  };
};
