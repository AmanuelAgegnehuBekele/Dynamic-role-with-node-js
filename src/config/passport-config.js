const LocalStrategy = require("passport-local").Strategy;
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const passportInit = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        await prisma.user
          .findUnique({
            where: { email: email },
          })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "The email address does not exist",
              });
            }

            bcrypt.compareSync(password, user.password, (err, isMatch) => {
              if (err) {
                throw err;
              }
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Password incorrect" });
              }
            });
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    process.nextTick(() => {
      return done(null, id);
    });
  });
};
