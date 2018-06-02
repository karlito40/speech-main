import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import passport  from "passport";

const LocalStrategy = passportLocal.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

export default () => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  }, async (email, password, done) => {
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOne({ email: email });
      if (!user || !await user.comparePassword(password)) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      return done(null, user, { message: "Logged In Successfully" });
    } catch (err) {
      return done(err);
    }
  }));

  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
  }, async (jwtPayload, done) => {
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOne(jwtPayload.id, { relations: ["scopes", "roles"] });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  return {
    initialize: () => passport.initialize()
  };
};
