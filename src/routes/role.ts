import express from "express";
import { isLoggedIn } from "../middleware/auth";
import {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
} from "../controller/role";

const router = express.Router();

router.post("/role/createRole", isLoggedIn, createRole);
router.get("/role/getRoles", isLoggedIn, getRoles);
router.get("/role/getRole/:roleId", isLoggedIn, getRole);
router.put("/role/updateRole/:roleId", isLoggedIn, updateRole);
router.delete("/role/deleteRole/:roleId", isLoggedIn, deleteRole);

export default router;
