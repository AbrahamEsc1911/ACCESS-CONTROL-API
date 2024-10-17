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
exports.currentRoom = exports.exitAccess = exports.entryAccess = exports.deleteReservation = exports.updateReservation = exports.createNewReservation = exports.getFutureReservationsByUserId = exports.currenStateRoomById = void 0;
const Access_1 = require("../database/models/Access");
const typeorm_1 = require("typeorm");
const Rooms_1 = require("../database/models/Rooms");
const AccessHistory_1 = require("../database/models/AccessHistory");
const currenStateRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const date = new Date();
        //TODO
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error retriving current state of room by id'
        });
    }
});
exports.currenStateRoomById = currenStateRoomById;
const getFutureReservationsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.tokenData.id);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        const allReservations = yield Access_1.Access.find({
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
                user_id: userId,
                entry_date: (0, typeorm_1.Between)(today, new Date(9999, 11, 31)) // Hasta una fecha futura lejana
            },
            relations: {
                room: true,
                user: true
            }
        });
        if (allReservations.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No appointments from today onwards'
            });
        }
        res.status(200).json({
            success: true,
            message: 'All appointments from today onwards',
            data: allReservations
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal error retriving all reservations'
        });
    }
});
exports.getFutureReservationsByUserId = getFutureReservationsByUserId;
const createNewReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomId = Number(req.params.roomId);
        const userId = Number(req.tokenData.id);
        const { entry_date, exit_date } = req.body;
        const date = new Date();
        if (!roomId || !entry_date || !exit_date) {
            return res.status(400).json({
                success: false,
                message: 'all values are required'
            });
        }
        const start = new Date(entry_date);
        const end = new Date(exit_date);
        if (start < date || start > end) {
            return res.status(400).json({
                success: false,
                message: 'date range for reservation is not valid'
            });
        }
        const room = yield Rooms_1.Rooms.findOne({
            where: {
                id: roomId
            }
        });
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }
        const previusReservations = yield Access_1.Access.find({
            where: {
                room_id: roomId,
                entry_date: (0, typeorm_1.LessThanOrEqual)(end),
                exit_date: (0, typeorm_1.MoreThanOrEqual)(start),
                state: (0, typeorm_1.Not)('cancelled')
            }
        });
        if (previusReservations.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'room are not available in the selected date range'
            });
        }
        const newReservation = yield Access_1.Access.create({
            user_id: userId,
            room_id: roomId,
            entry_date: start,
            exit_date: end
        }).save();
        res.status(201).json({
            success: true,
            message: 'reservation created',
            data: newReservation
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error creating a new reservaton',
            error: error
        });
    }
});
exports.createNewReservation = createNewReservation;
const updateReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservationId = Number(req.params.reservationId);
        const { room_id, entry_date, exit_date } = req.body;
        const date = new Date();
        const userId = req.tokenData.id;
        if (!reservationId) {
            return res.status(400).json({
                success: false,
                message: 'reservation id is required'
            });
        }
        if (!room_id && !entry_date && !exit_date) {
            return res.status(400).json({
                success: false,
                message: 'at least one value is required'
            });
        }
        const start = new Date(entry_date);
        const end = new Date(exit_date);
        if (start < date || start > end) {
            return res.status(400).json({
                success: false,
                message: 'date range invalid'
            });
        }
        const currentReservation = yield Access_1.Access.findOne({
            where: {
                id: reservationId,
            }
        });
        if (!currentReservation) {
            return res.status(400).json({
                success: false,
                message: 'current reservation is not available or doesnt exist'
            });
        }
        if (userId !== currentReservation.user_id) {
            return res.status(400).json({
                success: false,
                message: 'you are not allowed to change this reservation'
            });
        }
        const previusReservations = yield Access_1.Access.find({
            where: {
                room_id: currentReservation.room_id,
                entry_date: (0, typeorm_1.LessThanOrEqual)(end),
                exit_date: (0, typeorm_1.MoreThanOrEqual)(start),
                state: (0, typeorm_1.Not)('cancelled')
            }
        });
        if (previusReservations.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'room are not available in the selected date range'
            });
        }
        const body = {
            room_id: room_id || currentReservation.room_id,
            entry_date: start || currentReservation.entry_date,
            exit_date: end || currentReservation.exit_date
        };
        yield Access_1.Access.update({
            id: reservationId
        }, body);
        res.status(200).json({
            success: true,
            message: 'reservation updated successfully',
            data: body
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal error updating reservations'
        });
    }
});
exports.updateReservation = updateReservation;
const deleteReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservationId = Number(req.params.reservationId);
        const userId = req.tokenData.id;
        if (!reservationId) {
            return res.status(400).json({
                success: false,
                message: 'reservation id is required'
            });
        }
        const reservationDeleted = yield Access_1.Access.update({
            id: reservationId,
            user_id: userId
        }, {
            state: 'cancelled'
        });
        if (!reservationDeleted) {
            return res.status(404).json({
                success: false,
                message: 'reservation to delete not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'reservation have been cancelled',
            data: reservationDeleted
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal error deleting reservation'
        });
    }
});
exports.deleteReservation = deleteReservation;
const entryAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.id;
        const roomId = Number(req.params.roomId);
        const date = new Date();
        const timeLimitInMins = 30;
        if (!roomId) {
            return res.status(400).json({
                success: false,
                message: 'room id is required to access'
            });
        }
        const roomToAccess = yield Rooms_1.Rooms.findOne({
            where: {
                id: roomId
            }
        });
        if (!roomToAccess) {
            return res.status(400).json({
                success: false,
                message: 'room not found'
            });
        }
        const userIn = yield AccessHistory_1.AccessHistory.find({
            where: {
                user_id: userId,
                room_id: roomId,
                exit_date: (0, typeorm_1.IsNull)()
            }
        });
        if (userIn.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'you are already in'
            });
        }
        const reservations = yield Access_1.Access
            .createQueryBuilder('reservation')
            .where('reservation.user_id = :userId', { userId })
            .andWhere('reservation.room_id = :roomId', { roomId })
            .andWhere('DATE(reservation.entry_date) = DATE(:date)', { date })
            .getMany();
        if (reservations.length > 0) {
            reservations.forEach((reservation) => __awaiter(void 0, void 0, void 0, function* () {
                const entryDate = reservation.entry_date;
                const differenceInMs = entryDate.getTime() - date.getTime();
                const differenceInMins = differenceInMs / (1000 * 60);
                if ((differenceInMins >= -10 && differenceInMins <= 0) || (differenceInMins > 0 && differenceInMins <= timeLimitInMins))
                    yield Access_1.Access.update({
                        user_id: userId,
                        room_id: roomId
                    }, {
                        state: 'used'
                    });
            }));
        }
        const usersInRoom = yield AccessHistory_1.AccessHistory
            .createQueryBuilder('accessHistory')
            .where('accessHistory.room_id = :roomId', { roomId })
            .andWhere('accessHistory.exit_date IS NULL')
            .getCount();
        if (usersInRoom >= roomToAccess.capacity) {
            return res.status(400).json({
                success: false,
                message: 'acccess not granted because the room is already full'
            });
        }
        const access = yield AccessHistory_1.AccessHistory.create({
            user_id: userId,
            room_id: roomId,
            entry_date: date
        }).save();
        res.status(200).json({
            success: true,
            message: 'access granted',
            data: access
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server internal error to allow access to user',
            error: error
        });
    }
});
exports.entryAccess = entryAccess;
const exitAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.id;
        const date = new Date();
        const userOut = yield AccessHistory_1.AccessHistory.update({
            user_id: userId,
            exit_date: (0, typeorm_1.IsNull)()
        }, {
            exit_date: date
        });
        if (userOut.affected === 0) {
            return res.status(400).json({
                success: false,
                message: 'you have to access first before exit the room'
            });
        }
        res.status(200).json({
            success: true,
            message: 'you are out now, thanks for comming',
            data: userOut
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server internal error exiting access',
            error: error
        });
    }
});
exports.exitAccess = exitAccess;
const currentRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomId = Number(req.params.roomId);
        const room = yield Rooms_1.Rooms.findOne({
            where: {
                id: roomId
            }
        });
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'room not found'
            });
        }
        const roomStatus = yield AccessHistory_1.AccessHistory.find({
            select: {
                id: true,
                user: {
                    id: true,
                    name: true,
                    StartUp: true,
                    email: true,
                    phone: true
                },
                entry_date: true,
            },
            where: {
                room_id: roomId,
                exit_date: (0, typeorm_1.IsNull)()
            },
            relations: {
                user: true
            }
        });
        if (roomStatus.length <= 0) {
            return res.status(404).json({
                success: false,
                message: 'the room is currently empty'
            });
        }
        res.status(200).json({
            success: true,
            message: `curren state of room with id: ${roomId} and are ${roomStatus.length} people now`,
            roomData: room,
            data: roomStatus
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal error generting information of current room',
            error: error
        });
    }
});
exports.currentRoom = currentRoom;
