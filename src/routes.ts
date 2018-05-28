import { getApi, postLogin, postUser, getUsers } from "./controllers/api";
import passport from "passport";

export const AppRoutes = [
  { path: "/api", method: "get", action: getApi },
  { path: "/login", method: "post", action: postLogin },
  { path: "/user", method: "post", action: postUser },
  { path: "/users", method: "get", action: getUsers, middlewares: [
    passport.authenticate("jwt", { session: false })
  ]},
];
