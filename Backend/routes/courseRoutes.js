import express from "express";
import { createCourse, deleteCourseById, getAllCourses, getCourseById, updateCourseById } from "../controller/courseController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/course",protect,createCourse);
router.get("/getCourse",getAllCourses);
router.get("/getCourse/:id",getCourseById);
router.delete("/deleteCourse/:id",protect, deleteCourseById);
router.put("/updateCourse/:id", protect, updateCourseById);

export default router;
