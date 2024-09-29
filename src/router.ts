import { Router } from "express";
import { router as auhtRouters } from "./routers/auth.routers"
import { router as roomRouter } from "./routers/rooms.routers"
import { router as accessRouter } from "./routers/access.routers"
import { router as usersRouter } from "./routers/users.routers"

const router = Router()

router.use('/auth', auhtRouters)
router.use('/rooms', roomRouter)
router.use('/access', accessRouter)
router.use('/users', usersRouter)

export { router }