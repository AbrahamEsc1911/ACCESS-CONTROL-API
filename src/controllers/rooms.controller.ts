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

        if(isNaN(parsedCapacity)) {
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