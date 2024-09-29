import { Router } from "express";
import { auth } from "../middlewares/auth";
import { accessHistory, userCurrentAccess } from "../controllers/user.controller";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router()

router.get('/current-access/:id', auth, isAdmin, userCurrentAccess)
router.get('/access-history/:id', auth, isAdmin, accessHistory)

export { router }