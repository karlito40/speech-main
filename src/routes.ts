import { Facade as Route, RouteManager } from "./common/routes";

export default new RouteManager([
  Route.get("/api", "Api@getApi"),
  Route.get("/conversation/:id", "Api@getConversation"),

  // real route
  Route.post("/login", "Connexion@login"),
  Route.get("/user/:id", "User@get"),
  Route.get("/users", "User@list"),
]);