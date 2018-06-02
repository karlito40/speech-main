import { Facade as Route, RouteManager } from "./lib/routes";

export default new RouteManager([
  Route.post("/token", "Token@get"),

  /**
   * Resource User
   */
  Route.get("/users", "User@list"),
  Route.get("/user/:id", "User@get"),
  Route.post("/user", "User@create"),
  Route.put("/user/:id", "User@update"),

  /**
   * Resource Conversation
   */

  /**
   * Common
   */
  Route.get("/", "Api@index"),
  Route.all("*", "Api@notFound"),
]);