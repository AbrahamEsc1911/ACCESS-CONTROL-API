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
exports.roomUsage = exports.report = exports.dailyReport = void 0;
const Access_1 = require("../database/models/Access");
const typeorm_1 = require("typeorm");
const dailyReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const currentTime = new Date();
        const timeLimitInMins = 30;
        const reservations = yield Access_1.Access.find({
            where: {
                entry_date: (0, typeorm_1.Between)(today, tomorrow)
            }
        });
        for (const reservation of reservations) {
            const entryDate = new Date(reservation.entry_date);
            if (reservation.state === 'reserved') {
                const differenceInMs = currentTime.getTime() - entryDate.getTime();
                const differenceInMins = differenceInMs / (1000 * 60);
                if (differenceInMins > timeLimitInMins) {
                    yield Access_1.Access.update({
                        id: reservation.id
                    }, {
                        state: 'no_show'
                    });
                }
            }
        }
        const dailyReport = yield Access_1.Access.find({
            where: {
                entry_date: (0, typeorm_1.Between)(today, tomorrow)
            }
        });
        if (dailyReport.length == 0) {
            return res.status(404).json({
                success: false,
                message: 'no records to show',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Showing a daily report',
            data: dailyReport
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internar error genereting a daily report',
            error: error
        });
    }
});
exports.dailyReport = dailyReport;
const report = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        const currentTime = new Date();
        const timeLimitInMins = 30;
        const reservations = yield Access_1.Access.find({
            where: {
                entry_date: (0, typeorm_1.Between)(startDate, endDate)
            }
        });
        for (const reservation of reservations) {
            const entryDate = new Date(reservation.entry_date);
            if (reservation.state === 'reserved') {
                const differenceInMs = currentTime.getTime() - entryDate.getTime();
                const differenceInMins = differenceInMs / (1000 * 60);
                if (differenceInMins > timeLimitInMins) {
                    yield Access_1.Access.update({
                        id: reservation.id
                    }, {
                        state: 'no_show'
                    });
                }
            }
        }
        const report = yield Access_1.Access.find({
            where: {
                entry_date: (0, typeorm_1.Between)(startDate, endDate)
            },
            relations: {
                room: true,
            }
        });
        return res.status(200).json({
            success: true,
            message: 'Showing a report for the given date range.',
            data: report,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal error retriving report',
            error: error
        });
    }
});
exports.report = report;
const roomUsage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const totalReservation = yield Access_1.Access.count();
        const stateCount = yield Access_1.Access.createQueryBuilder("reservation")
            .select("reservation.state, COUNT(*) AS count")
            .groupBy("reservation.state")
            .getRawMany();
        const usedCount = ((_a = stateCount.find(s => s.state === 'used')) === null || _a === void 0 ? void 0 : _a.count) || 0;
        const cancelledCount = ((_b = stateCount.find(s => s.state === 'cancelled')) === null || _b === void 0 ? void 0 : _b.count) || 0;
        const noShowCount = ((_c = stateCount.find(s => s.state === 'no_show')) === null || _c === void 0 ? void 0 : _c.count) || 0;
        const usedPercentage = (usedCount / totalReservation) * 100;
        const cancelledPercentage = (cancelledCount / totalReservation) * 100;
        const noShowPercentage = (noShowCount / totalReservation) * 100;
        const roomUsage = yield Access_1.Access
            .createQueryBuilder("access")
            .select("access.room_id, room.room, COUNT(*) AS count")
            .innerJoin("access.room", "room")
            .groupBy("access.room_id, room.room")
            .orderBy("count", "DESC")
            .getRawMany();
        res.status(200).json({
            success: true,
            message: 'room usage data',
            totalReservation,
            usedPercentage,
            cancelledPercentage,
            noShowPercentage,
            roomUsage
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal error retriving rooms usage',
            error: error
        });
    }
});
exports.roomUsage = roomUsage;
