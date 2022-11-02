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
import cookieParser from "cookie-parser";

const port = 3000;

declare module "express-session" {
  interface SessionData {
    user: any;
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// passportInit(passport);

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: oneDay },
  })
);
app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passport.authenticate("session"));

// app.use(flash());
//api
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", courseRouter);
app.use("/api", testRouter);
app.use("/api", userEnrollmentRouter);
app.use("/api", testResultRouter);
app.use("/api", roleRouter);
app.use("/api", permissionRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
