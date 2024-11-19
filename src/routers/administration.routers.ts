import { Router } from "express"
import { dailyReport, report, roomUsage } from "../controllers/administration.controller"
import { auth } from "../middlewares/auth"
import { isAdmin } from "../middlewares/isAdmin"

const router = Router()

router.get('/daily-report', auth, isAdmin, dailyReport)
router.get('/reports', auth, isAdmin, report)
router.get('/room-usage', auth, isAdmin, roomUsage)

export { router }