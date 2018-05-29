import { Route } from "./Route";

export class RouteManager {
  routes: Array<Route>;
  constructor(routes: Array<Route>) {
    this.routes = routes;
  }

  initialize(app) {
    this.routes.forEach(route => {
      app[route.method](route.path, route.middlewares, route.action);
    });
  }
}