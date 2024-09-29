import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createNewReservation, currentRoom, deleteReservation, entryAccess, exitAccess, getAllReservationsById, updateReservation } from "../controllers/access.controller";

const router = Router()

router.get('/current/room/:roomId', auth, currentRoom)
router.get('/availability/:id', auth, getAllReservationsById)
router.post('/reservation/:roomId', auth, createNewReservation)
router.post('/:roomId', auth, entryAccess )
router.put('/', auth, exitAccess)
router.put('/reservation/:reservationId', auth, updateReservation)
router.delete('/reservation/:reservationId', auth, deleteReservation)

export { router }