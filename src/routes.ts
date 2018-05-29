import { action } from "./common/route";

type Route = { path: string, method: string, action: any, middlewares?: Array<any> };

export const AppRoutes: Array<Route> = [
  { path: "/api", method: "get", action: action("Api@getApi") },
  { path: "/login", method: "post", action: action("Api@postLogin") },
  { path: "/:user_id/conversation/", method: "get", action: action("Api@getConversation") },
  { path: "/user", method: "post", action: action("Api@postUser") },
  { path: "/users", method: "get", action: action("Api@getUsers")},
];
