import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createNewReservation, deleteReservation, getAllReservationsById, updateReservation } from "../controllers/access.controller";

const router = Router()

router.get('/availability/:id', auth, getAllReservationsById)
router.post('/reservation/:roomId', auth, createNewReservation)
router.put('/reservation/:reservationId', auth, updateReservation)
router.delete('/reservation/:reservationId', auth, deleteReservation)

export { router }