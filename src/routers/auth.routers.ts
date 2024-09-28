import { Router } from "express";
import { login, register, registerAdmin } from "../controllers/authentication.controller";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router()

router.post('/register', register)
router.post('/admin', auth, isAdmin, registerAdmin)
router.post('/login', login)

export { router }