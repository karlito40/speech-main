import { Facade as Route, RouteManager } from "./lib/routes";

export default new RouteManager([
  Route.post("/token", "Token@login"),

  /**
   * Resource User
   */
  Route.get("/users", "User@list"),
  Route.get("/me", "User@getMe"),
  Route.get("/user/:id", "User@get"),
  Route.post("/user", "User@create"),
  Route.put("/user/:id", "User@update"),

  Route.get("/profiles", "Profile@list"),
  Route.get("/profile/:id", "Profile@get"),
  Route.get("/profile/:id/for", "Profile@getCorrespondingProfiles"),
  Route.post("/profile", "Profile@create"),
  Route.put("/profile/:id", "Profile@update"),
  Route.post("/profile/:id/photo", "Profile@createPhoto"),
  Route.delete("/profile/:id/photo/:photoId", "Profile@deletePhoto"),

  /**
   * Resource Conversation
   */

  /**
   * Common
   */
  Route.get("/", "Api@index"),
  Route.all("*", "Api@notFound"),
]);