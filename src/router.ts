import { Router } from "express";
import { router as auhtRouters } from "./routers/auth.routers"

const router = Router()

router.use('/auth', auhtRouters)

export { router }