import express from "express"
import { createTeacher, deleteTeacherById, getAllTeachers, getTeacherById, updateTeacherById } from "../controller/teacherController.js";

import protect from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { teacherSchema } from "../validation/teacherValidation.js";

const router = express.Router();

router.post("/teachers",protect,validate(teacherSchema), createTeacher);
router.get("/getTeachers", getAllTeachers);
router.get("/getTeachers/:id",getTeacherById);
router.delete("/deleteTeacher/:id",protect,deleteTeacherById);
router.put("/updateTeacher/:id",protect,updateTeacherById);

export default router;