import express from "express";
import passport from "passport";
import { register, login, logout } from "../controller/auth";
import { isLoggedIn, isNotAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", isNotAuthenticated, login);
router.post("/auth/logout", isLoggedIn, logout);

export default router;
