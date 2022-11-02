import express from "express";
import { isLoggedIn } from "../middleware/auth";
import {
  createTest,
  getTests,
  getTest,
  updateTest,
  deleteTest,
} from "../controller/test";

const router = express.Router();

router.post("/test/createTest/:courseId", isLoggedIn, createTest);
router.get("/test/getTests", isLoggedIn, getTests);
router.get("/test/getTest/:testId", isLoggedIn, getTest);
router.put("/test/updateTest/:testId", isLoggedIn, updateTest);
router.delete("/test/deleteTest/:testId", isLoggedIn, deleteTest);

export default router;
