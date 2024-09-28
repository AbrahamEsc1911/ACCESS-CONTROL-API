import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createNewReservation, getAllReservationsById, updateReservation } from "../controllers/access.controller";

const router = Router()

router.get('/availability/:id', auth, getAllReservationsById)
router.post('/reservation/:roomId', auth, createNewReservation)
router.put('/reservation/:reservationId', auth, updateReservation)

export { router }