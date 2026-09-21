import express from "express";
import { createStudent, deleteStudentById, getAllStudents, getStudentById, updateStudentById } from "../controller/studentController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/students",protect,createStudent);
router.get("/getStudent",getAllStudents);
router.get("/getStudent/:id",getStudentById);
router.delete("/deleteStudent/:id",protect,deleteStudentById);
router.put("/updateStudent/:id",protect,updateStudentById );

export default router;
