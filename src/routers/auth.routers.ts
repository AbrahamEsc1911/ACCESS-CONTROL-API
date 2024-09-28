import { Router } from "express";
import { login, register, registerAdmin } from "../controllers/authentication.controller";

const router = Router()

router.post('/register', register)
router.post('/admin', registerAdmin)
router.post('/login', login)

export { router }