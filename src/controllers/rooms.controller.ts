import { Request, Response } from "express";
import { Rooms } from "../database/models/Rooms";

export const createNewRoom = async (req: Request, res: Response) => {

    try {

        const { room, capacity, room_type } = req.body

        if (!room || !capacity || !room_type) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'All values are require to create a new room'
                }
            )
        }

        const parsedCapacity = Number(capacity)

        if (isNaN(parsedCapacity)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'capacity most to be a valid number'
                }
            )
        }

        const newRoom = await Rooms.create(
            {
                room: room,
                capacity: parsedCapacity,
                room_type: room_type
            }
        ).save()

        res.status(200).json(
            {
                success: true,
                message: 'new room created',
                data: newRoom
            }
        )

    } catch (error) {

        res.status(400).json(
            {
                success: false,
                message: 'internal error creating a new room',
                error: error
            }
        )

    }
}

export const updateRoom = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id)
        const { room, capacity, room_type } = req.body

        if(!id) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'the id is required'
                }
            )
        }

        if (!room && !capacity && !room_type) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'at least one value is required to update room information'
                }
            )
        }

        const currentRoom = await Rooms.findOne(
            {
                where: {
                    id: id
                }
            }
        )

        if(!currentRoom) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'room not found'
                }
            )
        }

        const body = {
            room: room || currentRoom.room,
            capacity: capacity || currentRoom.capacity,
            room_type: room_type || currentRoom.room_type
        }

        const roomUpdate = await Rooms.update(
            {
                id: id
            }, body
        )

        res.status(200).json(
            {
                success: true,
                message: 'room updated',
                data: body
            }
        )
        
    } catch (error) {
        res.status(500).json(
            {
                succcess: false,
                message: 'Internar error updating room',
                error: error
            }
        )
    }
}