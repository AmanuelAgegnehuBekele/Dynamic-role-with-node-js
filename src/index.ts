import express from "express";
const app = express();
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import courseRouter from "./routes/course";
import testRouter from "./routes/test";
import userEnrollmentRouter from "./routes/userEnrollment";
import testResultRouter from "./routes/testResult";
import roleRouter from "./routes/role";
import permissionRouter from "./routes/permission";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import passport from "passport";
import { PrismaClient } from "@prisma/client";

//when using proxy like nginx

// app.set("trust proxy", 1);

declare module "express-session" {
  interface SessionData {
    user: any;
  }
}
const prismaClient = new PrismaClient();
const options = {
  checkPeriod: 2 * 60 * 1000, //ms
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
};
const prismaStore = new PrismaSessionStore(prismaClient, options);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// passportInit(passport);

app.use(passport.initialize());

app.use(
  session({
    cookie: { maxAge: 1000 * 60 * 30, httpOnly: true, secure: false },
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: prismaStore,
  })
);

passport.serializeUser(function (id: any, cb: any) {
  process.nextTick(function () {
    return cb(null, id);
  });
});

passport.deserializeUser(function (id: any, cb: any) {
  process.nextTick(function () {
    return cb(null, id);
  });
});
app.use(passport.authenticate("session"));

app.get("/", (req, res) => {
  res.send("Express is working");
});
//api
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", courseRouter);
app.use("/api", testRouter);
app.use("/api", userEnrollmentRouter);
app.use("/api", testResultRouter);
app.use("/api", roleRouter);
app.use("/api", permissionRouter);

const port = process.env.PORT;
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
