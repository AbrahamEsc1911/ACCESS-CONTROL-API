import { Router } from "express";
import { createNewRoom, updateRoom } from "../controllers/rooms.controller";

const router = Router()

router.post('/', createNewRoom)
router.put('/:id', updateRoom)

export { router }