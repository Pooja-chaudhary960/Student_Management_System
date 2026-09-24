import express from "express";
import { createCourse, deleteCourseById, getAllCourses, getCourseById, updateCourseById } from "../controller/courseController.js";

import protect from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { courseSchema } from "../validation/courseValidation.js";

const router = express.Router();

router.post("/course",protect,validate(courseSchema),createCourse);
router.get("/getCourse",getAllCourses);
router.get("/getCourse/:id",getCourseById);
router.delete("/deleteCourse/:id",protect, deleteCourseById);
router.put("/updateCourse/:id", protect, updateCourseById);

export default router;
