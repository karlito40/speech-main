import { Response, Request, NextFunction } from "express";
import ApiController from "./controllers/api";

type Route = { path: string, method: string, action: any, middlewares?: Array<any> };
type Routes = Array<Route>;

const action = (handler: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const controller = new ApiController(req, res, next);
    return controller[handler]();
  };
};

export const AppRoutes: Routes = [
  { path: "/api", method: "get", action: action("getApi") },
  { path: "/login", method: "post", action: action("postLogin") },
  { path: "/:user_id/conversation/", method: "get", action: action("getConversation") },
  { path: "/user", method: "post", action: action("postUser") },
  // { path: "/users", method: "get", action: getUsers, middlewares: [isAuthenticated()]},
  { path: "/users", method: "get", action: action("getUsers")},
];
