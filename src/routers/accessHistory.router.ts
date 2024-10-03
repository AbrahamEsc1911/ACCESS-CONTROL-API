import { Router } from "express";
import { auth } from "../middlewares/auth";
import { accessHistoriesRoomById, accessHistory } from "../controllers/accessHistory.controller";

const router = Router()

router.get('/', auth, accessHistory)
router.get('/room/:id', auth, accessHistoriesRoomById)

export { router }