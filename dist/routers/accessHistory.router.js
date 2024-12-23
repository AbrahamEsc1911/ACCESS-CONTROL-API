"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const accessHistory_controller_1 = require("../controllers/accessHistory.controller");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', auth_1.auth, accessHistory_controller_1.accessHistory);
router.get('/room/:id', auth_1.auth, accessHistory_controller_1.accessHistoriesRoomById);
router.get('/month', auth_1.auth, accessHistory_controller_1.accessHistoryCurrentMonthByUser);
