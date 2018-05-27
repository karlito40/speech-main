import passport from "passport";
import passportLocal from "passport-local";
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;

// passport.use(new LocalStrategy({
//   usernameField: "email",
//   passwordField: "password"
// }, (email, password, cb) => {

// }));

