import express from "express";
import { isLoggedIn } from "../middleware/auth";
import {
  createUserEnrollment,
  getUserEnrollments,
  getUserEnrollment,
  updateUserEnrollment,
  deleteUserEnrollment,
} from "../controller/userEnrollment";

const router = express.Router();

router.post(
  "/userEnrollment/createUserEnrollment/:userId",
  isLoggedIn,
  createUserEnrollment
);
router.get(
  "/userEnrollment/getUserEnrollments/:userId",
  isLoggedIn,
  getUserEnrollments
);
router.get(
  "/userEnrollment/getUserEnrollment/:courseId",
  isLoggedIn,
  getUserEnrollment
);
router.put(
  "/userEnrollment/updateUserEnrollment/:testId",
  isLoggedIn,
  updateUserEnrollment
);
router.delete(
  "/userEnrollment/deleteUserEnrollment/:courseId",
  isLoggedIn,
  deleteUserEnrollment
);

export default router;
