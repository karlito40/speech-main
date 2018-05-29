import { Facade as Route, RouteManager } from "./common/route";

export default new RouteManager([
  Route.get("/api", "Api@getApi"),
  Route.post("/login", "Api@postLogin"),
  Route.get("/conversation/:id", "Api@getConversation"),
  Route.post("/user", "Api@postUser"),
  Route.get("/users", "Api@getUsers"),
]);