import express from "express";
import { createCourse, deleteCourseById, getAllCourses, getCourseById, updateCourseById } from "../controller/courseController.js";

const router = express.Router();

router.post("/course",createCourse);
router.get("/getCourse",getAllCourses);
router.get("/getCourse/:id",getCourseById);
router.delete("/deleteCourse/:id", deleteCourseById);
router.put("/updateCourse/:id", updateCourseById);

export default router;
