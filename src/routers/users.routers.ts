import { Router } from "express";
import { auth } from "../middlewares/auth";

const router = Router()

router.get('/current-access/:id', auth)

export { router }