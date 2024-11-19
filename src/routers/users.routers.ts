import { Router } from "express";
import { auth } from "../middlewares/auth";
import { accessHistory, userCurrentAccess, userProfile } from "../controllers/user.controller";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router()

router.get('/', auth, userProfile)
router.get('/current-access/', auth, userCurrentAccess)
router.get('/access-history/', auth, accessHistory)

export { router }