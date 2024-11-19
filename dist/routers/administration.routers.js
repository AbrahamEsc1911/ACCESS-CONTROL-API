"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const administration_controller_1 = require("../controllers/administration.controller");
const auth_1 = require("../middlewares/auth");
const isAdmin_1 = require("../middlewares/isAdmin");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/daily-report', auth_1.auth, isAdmin_1.isAdmin, administration_controller_1.dailyReport);
router.get('/reports', auth_1.auth, isAdmin_1.isAdmin, administration_controller_1.report);
router.get('/room-usage', auth_1.auth, isAdmin_1.isAdmin, administration_controller_1.roomUsage);
