import { Router } from "express";
import { auth } from "../middlewares/auth";
import { accessHistoriesRoomById, accessHistory, accessHistoryCurrentMonthByUser } from "../controllers/accessHistory.controller";

const router = Router()

router.get('/', auth, accessHistory)
router.get('/room/:id', auth, accessHistoriesRoomById)
router.get('/month', auth, accessHistoryCurrentMonthByUser)

export { router }