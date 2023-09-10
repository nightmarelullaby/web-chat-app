import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { register, login, logout, verifyToken } from "../controllers/auth.controller.js"
import { loginSchema,registerSchema } from "../schemas/auth.schema.js";
const router = Router()

router.post("/register", validateSchema(registerSchema), register)
router.post("/login", validateSchema(loginSchema), login)
router.post("/logout", authRequired, logout)
router.get("/verify", authRequired, verifyToken)
export default router
