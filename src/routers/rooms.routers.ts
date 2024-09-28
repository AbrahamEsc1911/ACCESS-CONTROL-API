import { Router } from "express";
import { createNewRoom, deleteRoomById, getAllRooms, updateRoom } from "../controllers/rooms.controller";

const router = Router()

router.get('/', getAllRooms)
router.post('/', createNewRoom)
router.put('/:id', updateRoom)
router.delete('/:id', deleteRoomById)

export { router }