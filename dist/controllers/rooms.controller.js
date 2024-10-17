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
exports.deleteRoomById = exports.getAllRooms = exports.updateRoom = exports.createNewRoom = void 0;
const Rooms_1 = require("../database/models/Rooms");
const createNewRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { room, capacity, room_type } = req.body;
        if (!room || !capacity || !room_type) {
            return res.status(400).json({
                success: false,
                message: 'All values are require to create a new room'
            });
        }
        const parsedCapacity = Number(capacity);
        if (isNaN(parsedCapacity)) {
            return res.status(400).json({
                success: false,
                message: 'capacity most to be a valid number'
            });
        }
        const newRoom = yield Rooms_1.Rooms.create({
            room: room,
            capacity: parsedCapacity,
            room_type: room_type
        }).save();
        res.status(200).json({
            success: true,
            message: 'new room created',
            data: newRoom
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'internal error creating a new room',
            error: error
        });
    }
});
exports.createNewRoom = createNewRoom;
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { room, capacity, room_type } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'the id is required'
            });
        }
        if (!room && !capacity && !room_type) {
            return res.status(400).json({
                success: false,
                message: 'at least one value is required to update room information'
            });
        }
        const currentRoom = yield Rooms_1.Rooms.findOne({
            where: {
                id: id
            }
        });
        if (!currentRoom) {
            return res.status(404).json({
                success: false,
                message: 'room not found'
            });
        }
        const body = {
            room: room || currentRoom.room,
            capacity: capacity || currentRoom.capacity,
            room_type: room_type || currentRoom.room_type
        };
        const roomUpdate = yield Rooms_1.Rooms.update({
            id: id
        }, body);
        res.status(200).json({
            success: true,
            message: 'room updated',
            data: body
        });
    }
    catch (error) {
        res.status(500).json({
            succcess: false,
            message: 'Internar error updating room',
            error: error
        });
    }
});
exports.updateRoom = updateRoom;
const getAllRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRooms = yield Rooms_1.Rooms.find();
        if (allRooms.length === 0) {
            return res.status(404).json({
                success: false,
                message: "There are not rooms created yet, create one"
            });
        }
        res.json({
            success: true,
            message: 'all rooms retrieved',
            data: allRooms
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retriving all rooms'
        });
    }
});
exports.getAllRooms = getAllRooms;
const deleteRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'id valid is required to delet a room'
            });
        }
        const deletedRoom = yield Rooms_1.Rooms.delete(id);
        if (deletedRoom.affected === 0) {
            return res.status(404).json({
                success: false,
                message: "nothing found to delete"
            });
        }
        res.status(200).json({
            success: true,
            message: `room with id: ${id} deleted successfully`,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal error deleting room by id',
            error: error
        });
    }
});
exports.deleteRoomById = deleteRoomById;
