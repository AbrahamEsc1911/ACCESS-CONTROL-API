import { Router } from "express"
import { dailyReport } from "../controllers/administration.controller"
import { auth } from "../middlewares/auth"
import { isAdmin } from "../middlewares/isAdmin"

const router = Router()

router.get('/daily-report', auth, isAdmin, dailyReport)

export {router}