import { Route } from "./Route";

export class RouteManager {
  routes: Array<Route>;
  constructor(routes: Array<Route>) {
    this.routes = routes;
  }

  initialize(app) {
    for (const route of this.routes) {
      app[route.method](route.path, route.middlewares, route.action);
    }
  }
}