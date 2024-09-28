import { Router } from "express";
import { router as auhtRouters } from "./routers/auth.routers"
import { router as roomRouter } from "./routers/rooms.routers"

const router = Router()

router.use('/auth', auhtRouters)
router.use('/rooms', roomRouter)

export { router }