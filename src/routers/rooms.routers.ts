import { Router } from "express";
import { createNewRoom, getAllRooms, updateRoom } from "../controllers/rooms.controller";

const router = Router()

router.get('/', getAllRooms)
router.post('/', createNewRoom)
router.put('/:id', updateRoom)

export { router }