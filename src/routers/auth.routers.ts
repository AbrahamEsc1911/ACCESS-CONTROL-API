import { Router } from "express";
import { register } from "../controllers/authentication.controller";

const router = Router()

router.post('/register', register)

export { router }