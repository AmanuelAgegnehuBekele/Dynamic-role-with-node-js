import express from "express";
import { isLoggedIn } from "../middleware/auth";
import {
  createTestResult,
  getTestResults,
  getTestResult,
  updateTestResult,
  deleteTestResult,
} from "../controller/testResult";

const router = express.Router();

router.post(
  "/testResult/createTestResult/:testId",
  isLoggedIn,
  createTestResult
);
router.get("/testResult/getTestResults/:testId", isLoggedIn, getTestResults);
router.get("/testResult/getTestResult/:userId", isLoggedIn, getTestResult);
router.put(
  "/testResult/updateTestResult/:testResultId",
  isLoggedIn,
  updateTestResult
);
router.delete(
  "/testResult/deleteTestResult/:testResultId",
  isLoggedIn,
  deleteTestResult
);

export default router;
