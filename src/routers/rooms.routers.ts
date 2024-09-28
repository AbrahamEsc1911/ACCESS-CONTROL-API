import { Router } from "express";
import { createNewRoom } from "../controllers/rooms.controller";

const router = Router()

router.post('/', createNewRoom)

export { router }