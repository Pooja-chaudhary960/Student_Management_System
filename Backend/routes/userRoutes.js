import express from "express";
import { loginUser, logout, registerUser} from "../controller/userController.js";
import { validate } from "../middleware/validate.js";
import { registerSchema } from "../validation/registerValidation.js";
import { loginSchema } from "../validation/loginValidation.js";

const router = express.Router();

router.post('/register',validate(registerSchema),registerUser);

router.post('/login',validate(loginSchema),loginUser);

router.post('/logout', logout);



export default router;