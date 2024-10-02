import { Router } from "express"
import { dailyReport, report } from "../controllers/administration.controller"
import { auth } from "../middlewares/auth"
import { isAdmin } from "../middlewares/isAdmin"

const router = Router()

router.get('/daily-report', auth, isAdmin, dailyReport)
router.get('/reports', auth, isAdmin, report)

export {router}