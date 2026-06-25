import express from "express";
const router = express.Router();

//controller
import { register, login } from "../controllers/authController.js";
import { loginSchema, registerSchema, validate } from "../utils/validator.js";

// endpoint
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema),login);

export default router;