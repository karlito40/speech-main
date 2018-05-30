import winston from "winston";
import { Logger } from "winston";
import moment from "moment";
import { inspect } from "util";
import { isProduction } from "./env";

const options = {
  timestamp: () => "[" + moment().format("DD/MM/YYYY HH:kk:mm") + "]",
  colorize: true,
  prettyPrint: true,
  formatter: (options) => {
    return `[d: ${options.timestamp()}] [level: ${options.level}] `
      + (options.message || "")
      + (options.meta && Object.keys(options.meta).length ? JSON.stringify(options.meta, null, "\t") : "" );

  }
};

const logger = new (Logger)({
  transports: [
    new (winston.transports.Console)({
      level: isProduction() ? "error" : "debug",
      ...options
    }),
    new (winston.transports.File)({
      filename: "./logs/debug.log", level: "debug",
      json: false,
      ...options
    })
  ]
});

export default logger;

export const log = (level, ...args) => {
  let message = "";
  args.forEach((arg, i) => {
    if (arg instanceof Error) {
      message += " " + arg.message + "\n" + arg.stack;
    } else if (typeof arg == "object") {
      message += " " + inspect(arg, { showHidden: true });
    } else {
      message += " " + arg;
    }
  });
  return logger[level](message);
};

export const logError = (code, ...args) => {
  args = ["error", `[code: ${code}]`, ...args];
  return log.apply(null, args);
};

