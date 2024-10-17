"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const rooms_controller_1 = require("../controllers/rooms.controller");
const auth_1 = require("../middlewares/auth");
const isAdmin_1 = require("../middlewares/isAdmin");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', rooms_controller_1.getAllRooms);
router.post('/', auth_1.auth, isAdmin_1.isAdmin, rooms_controller_1.createNewRoom);
router.put('/:id', auth_1.auth, isAdmin_1.isAdmin, rooms_controller_1.updateRoom);
router.delete('/:id', auth_1.auth, isAdmin_1.isAdmin, rooms_controller_1.deleteRoomById);