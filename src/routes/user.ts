import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/user";
import { isLoggedIn } from "../middleware/auth";

const router = express.Router();

router.get("/users/getUsers", isLoggedIn, getUsers);
router.get("/users/getUser/:userId", isLoggedIn, getUserById);
router.put("/users/updateUser/:userId", isLoggedIn, updateUser);
router.delete("/users/deleteUser/:userId", isLoggedIn, deleteUser);

export default router;
