import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getAllReservations } from "../controllers/access.controller";

const router = Router()

router.get('/availability/:id', auth, getAllReservations)

export { router }