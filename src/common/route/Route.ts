export class Route {
  path: string;
  action: Function;
  actionName: string;
  middlewares: Array<any>;
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
    const ControllerClass = require(`../../controller/${controllerName}`).default;

    return (req, res, next) => {
      const controller = new ControllerClass(req, res, next);
      return controller[handler]();
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
  }
};