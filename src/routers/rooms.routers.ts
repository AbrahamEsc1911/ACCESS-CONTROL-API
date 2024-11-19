import { Router } from "express";
import { createNewRoom, deleteRoomById, getAllRooms, updateRoom } from "../controllers/rooms.controller";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router()

router.get('/', getAllRooms)
router.post('/', auth, isAdmin, createNewRoom)
router.put('/:id', auth, isAdmin, updateRoom)
router.delete('/:id', auth, isAdmin, deleteRoomById)

export { router }