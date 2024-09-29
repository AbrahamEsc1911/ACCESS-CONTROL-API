import { Router } from "express";
import { auth } from "../middlewares/auth";
import { userCurrentAccess } from "../controllers/user.controller";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router()

router.get('/current-access/:id', auth, isAdmin, userCurrentAccess)

export { router }