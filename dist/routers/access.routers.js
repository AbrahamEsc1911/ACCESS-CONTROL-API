"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const access_controller_1 = require("../controllers/access.controller");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/current/room/:roomId', auth_1.auth, access_controller_1.currentRoom);
router.get('/my-reservations', auth_1.auth, access_controller_1.getFutureReservationsByUserId);
router.post('/reservation/:roomId', auth_1.auth, access_controller_1.createNewReservation);
router.post('/:roomId', auth_1.auth, access_controller_1.entryAccess);
router.put('/', auth_1.auth, access_controller_1.exitAccess);
router.put('/reservation/:reservationId', auth_1.auth, access_controller_1.updateReservation);
router.delete('/reservation/:reservationId', auth_1.auth, access_controller_1.deleteReservation);
