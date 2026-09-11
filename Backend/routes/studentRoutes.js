import express from "express";
import { createStudent, deleteStudentById, getAllStudents, getStudentById, updateStudentById } from "../controller/studentController.js";

const router = express.Router();

router.post("/students",createStudent);
router.get("/getStudent",getAllStudents);
router.get("/getStudent/:id",getStudentById);
router.delete("/deleteStudent/:id",deleteStudentById);
router.put("/updateStudent/:id",updateStudentById );

export default router;
