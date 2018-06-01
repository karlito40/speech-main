import { Facade as Route, RouteManager } from "./lib/routes";

export default new RouteManager([
  Route.get("/", "Api@index"),
  Route.get("/conversation/:id", "Api@getConversation"),

  // real route
  Route.post("/login", "Connexion@login"),
  Route.get("/user/:id", "User@get"),
  Route.get("/users", "User@list"),
  Route.all("*", "Api@notFound"),
]);