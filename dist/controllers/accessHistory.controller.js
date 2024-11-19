"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessHistoryCurrentMonthByUser = exports.accessHistoriesRoomById = exports.accessHistory = void 0;
const AccessHistory_1 = require("../database/models/AccessHistory");
const typeorm_1 = require("typeorm");
const accessHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { start_date, end_date } = req.query;
        if (!start_date || !end_date) {
            return res.status(400).json({
                success: false,
                message: 'start date and end date are required'
            });
        }
        const startDate = new Date(String(start_date));
        const endDate = new Date(String(end_date));
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format, Please use YYYY-MM-DD format'
            });
        }
        const accessHistory = yield AccessHistory_1.AccessHistory.find({
            select: {
                user: {
                    id: true,
                    name: true,
                    StartUp: true,
                    email: true,
                    password: false,
                    phone: true,
                    dni: true,
                },
            },
            where: {
                entry_date: (0, typeorm_1.Between)(startDate, endDate)
            },
            relations: {
                room: true,
                user: true
            },
            order: {
                entry_date: 'DESC',
            },
        });
        if (accessHistory.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Nothin to show'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Showing the report of acccess',
            data: accessHistory
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error retriving access history',
            error: error
        });
    }
});
exports.accessHistory = accessHistory;
const accessHistoriesRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomId = Number(req.params.id);
        const { start_date, end_date } = req.query;
        if (!roomId || !start_date || !end_date) {
            return res.status(400).json({
                success: false,
                message: 'all values are required'
            });
        }
        const startDate = new Date(String(start_date));
        const endDate = new Date(String(end_date));
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || isNaN(roomId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format, Please use YYYY-MM-DD format'
            });
        }
        const historiesById = yield AccessHistory_1.AccessHistory.find({
            where: {
                room_id: roomId,
                entry_date: (0, typeorm_1.Between)(startDate, endDate)
            },
            relations: {
                room: true,
                user: true
            },
            order: {
                entry_date: 'DESC',
            },
        });
        if (historiesById.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'no history to show'
            });
        }
        res.status(200).json({
            success: true,
            message: 'showing access histories of room by id and range of dates',
            data: historiesById
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal error getting access histories by room id',
            error: error
        });
    }
});
exports.accessHistoriesRoomById = accessHistoriesRoomById;
const accessHistoryCurrentMonthByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }
        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const accessHistory = yield AccessHistory_1.AccessHistory.find({
            select: {
                user: {
                    id: true,
                    name: true,
                    StartUp: true,
                    email: true,
                    password: false,
                    phone: true,
                    dni: true,
                },
            },
            where: {
                user: { id: userId },
                entry_date: (0, typeorm_1.Between)(startDate, endDate)
            },
            relations: {
                room: true,
                user: true
            }
        });
        if (accessHistory.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No access history found for the current month and user'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Access history for the current month and user',
            data: accessHistory
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal error retrieving access history',
            error: error
        });
    }
});
exports.accessHistoryCurrentMonthByUser = accessHistoryCurrentMonthByUser;
