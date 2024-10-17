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
exports.userProfile = exports.accessHistory = exports.userCurrentAccess = void 0;
const Users_1 = require("../database/models/Users");
const AccessHistory_1 = require("../database/models/AccessHistory");
const userCurrentAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.id;
        const user = yield Users_1.Users.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            });
        }
        const userCurrent = yield AccessHistory_1.AccessHistory.findOne({
            select: {
                user: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    StartUp: true
                },
            },
            where: {
                user_id: userId
            },
            order: {
                id: 'DESC'
            },
            relations: {
                room: true,
                user: true
            }
        });
        if (!userCurrent) {
            return res.status(200).json({
                success: false,
                message: 'user has no records yet'
            });
        }
        if (!userCurrent.exit_date) {
            return res.status(200).json({
                success: true,
                message: 'The user is still inside the premises',
                data: userCurrent
            });
        }
        else {
            return res.status(200).json({
                success: false,
                message: 'User is out installations',
                data: userCurrent
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server internal error getting curren access of user',
            error: error
        });
    }
});
exports.userCurrentAccess = userCurrentAccess;
const accessHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.id;
        const page = Number(req.query.page) || 1;
        const limit = 3;
        const skip = (page - 1) * limit;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'user id is required'
            });
        }
        const [userHistory, total] = yield AccessHistory_1.AccessHistory.findAndCount({
            select: {
                user: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    StartUp: true
                },
            },
            where: {
                user_id: userId
            },
            relations: {
                room: true,
                user: true
            },
            skip: skip,
            take: limit,
            order: {
                entry_date: 'DESC',
            },
        });
        if (userHistory.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'User has not any records yet'
            });
        }
        res.status(200).json({
            success: true,
            message: 'user access history',
            data: userHistory,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            messaga: 'Internal error retriving user access history',
            error: error
        });
    }
});
exports.accessHistory = accessHistory;
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'you are not allowed'
            });
        }
        const profile = yield Users_1.Users.findOne({
            select: {
                name: true,
                StartUp: true,
                email: true,
                dni: true,
                phone: true
            },
            where: {
                id: userId
            }
        });
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'user not found or deleted'
            });
        }
        res.status(200).json({
            success: true,
            message: 'user profile retrived',
            data: profile
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal server error retriving user profile',
            error: error
        });
    }
});
exports.userProfile = userProfile;
