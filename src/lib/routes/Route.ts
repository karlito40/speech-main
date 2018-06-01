export class Route {
  path: string;
  action: Function;
  actionName: string;
  middlewares: any[];
  method: string;

  constructor(method: string, path: string, action: string, middlewares?: Array<any>) {
    this.method = method;
    this.path = path;
    this.actionName = action;
    this.action = this.convertAction(action);
    this.middlewares = middlewares ? middlewares : [(req, res, next) => { next(); }];
  }

  private convertAction(actionString: string) {
    const [controllerName, handler] = actionString.split("@");
    const Controller = require(`../../controllers/${controllerName}Controller`).default;

    return async (req, res, next) => {
      const controller = new Controller(req, res, next, this);
      try {
        return await controller[handler]();
      } catch (err) {
        return controller.internalError(err, "UNKNOWN_ERR0R");
      }
    };
  }
}

export const Facade = {
  build(method, path, action, middlewares?): Route {
    return new Route(method, path, action, middlewares);
  },

  get(path, action, middlewares?) {
    return this.build("get", path, action, middlewares);
  },

  post(path, action, middlewares?) {
    return this.build("post", path, action, middlewares);
  },

  put(path, action, middlewares?) {
    return this.build("put", path, action, middlewares);
  },

  all(path, action, middlewares?) {
    return this.build("all", path, action, middlewares);
  },
};