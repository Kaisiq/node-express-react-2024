import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt, type StrategyOptions } from "passport-jwt";
import { UserService } from "../services/UserService";
import * as bcrypt from "bcrypt";
import { mongooseConnect } from "../lib/mongoose";

// Initialize passport strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // specify that we're using email instead of username
    async function (email: string, password: string, done) {
      await mongooseConnect();
      const userService = new UserService();
      try {
        if (!email || !password) {
          return done(null, false, {
            message: "Не сте попълнили всички полета.",
          });
        }
        const exists = await userService.getSingleUser(email);
        if (!exists) {
          const hashedPass = await bcrypt.hash(password, Number(process.env.NEXTAUTH_HASHLEVELS));
          const user = await userService.createUser({
            email,
            hashedPassword: hashedPass,
          });
          return done(null, user, { message: "" });
        } else if (!exists.hashedPassword) {
          return done(null, false, {
            message: "Вече сте създали акаунт с този имейл чрез Google. Моля влезте чрез Google.",
          });
        } else {
          const passwordsMatch = await bcrypt.compare(password, exists.hashedPassword);
          if (!passwordsMatch) {
            return done(null, false, { message: "Грешен Имейл или Парола." });
          }
          return done(null, exists, { message: "" });
        }
      } catch (error) {
        console.error("Error parsing request body:", error);
        return done(null, false, { message: "Грешка в подадените данни." });
      }
    }
  )
);

// JWT strategy
const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "your_jwt_secret",
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    await mongooseConnect();
    const userService = new UserService();
    try {
      const user = await userService.getSingleUser(jwt_payload.email);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
