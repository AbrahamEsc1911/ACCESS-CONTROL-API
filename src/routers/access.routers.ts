import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createNewReservation, getAllReservations } from "../controllers/access.controller";

const router = Router()

router.get('/availability/:id', auth, getAllReservations)
router.post('/reservation/:id', auth, createNewReservation)

export { router }