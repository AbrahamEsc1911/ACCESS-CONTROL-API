import { Router } from "express";
import { auth } from "../middlewares/auth";
import { accessHistory } from "../controllers/accessHistory.controller";

const router = Router()

router.get('/', auth, accessHistory)

export { router }