import express from "express";
import { isLoggedIn } from "../middleware/auth";
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controller/course";

const router = express.Router();

router.post("/course/createCourse", isLoggedIn, createCourse);
router.get("/course/getCourses", isLoggedIn, getCourses);
router.get("/course/getCourse/:courseId", isLoggedIn, getCourse);
router.put("/course/updateCourse/:courseId", isLoggedIn, updateCourse);
router.delete("/course/deleteCourse/:courseId", isLoggedIn, deleteCourse);

export default router;
