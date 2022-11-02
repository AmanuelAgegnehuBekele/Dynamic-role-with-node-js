import express from "express";
import { isLoggedIn } from "../middleware/auth";
import {
  createPermission,
  getPermissions,
  getPermission,
  updatePermission,
  deletePermission,
} from "../controller/permission";

const router = express.Router();

router.post("/permission/createPermission", isLoggedIn, createPermission);
router.get("/permission/getPermissions", isLoggedIn, getPermissions);
router.get("/permission/getPermission/:permId", isLoggedIn, getPermission);
router.put(
  "/permission/updatePermission/:permId",
  isLoggedIn,
  updatePermission
);
router.delete(
  "/permission/deletePermission/:permId",
  isLoggedIn,
  deletePermission
);

export default router;
