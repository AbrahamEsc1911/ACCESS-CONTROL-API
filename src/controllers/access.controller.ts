import { Request, Response } from "express";
import { Access } from "../database/models/Access";
import { Between, IsNull, LessThanOrEqual, MoreThanOrEqual, Not } from "typeorm";
import { Rooms } from "../database/models/Rooms";
import { AccessHistory } from "../database/models/AccessHistory";

export const currenStateRoomById = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id)
        const date = new Date()

        //TODO

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'server error retriving current state of room by id'
            }
        )
    }
}

export const getAllReservationsById = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id)
        const { start_date, end_date } = req.query

        if (!start_date) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'start date is required to filter the results'
                }
            )
        }

        const allReservations = await Access.find(
            {
                where: {
                    room_id: id,
                    entry_date: Between(new Date(start_date as string), new Date(end_date as string || start_date as string))
                }
            }
        )

        if (allReservations.length === 0) {
            return res.status(404).json(
                {
                    success: true,
                    message: 'No appointments between this dates'
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: 'all apointments for this dates',
                date: allReservations
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'internal error retriving all reservations'
            }
        )
    }
}

export const createNewReservation = async (req: Request, res: Response) => {
    try {

        const roomId = Number(req.params.roomId)
        const userId = Number(req.tokenData.id)
        const { entry_date, exit_date } = req.body
        const date = new Date()

        if (!roomId || !entry_date || !exit_date) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'all values are required'
                }
            )
        }

        const start = new Date(entry_date)
        const end = new Date(exit_date)

        if (start < date || start > end) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'date range for reservation is not valid'
                }
            )
        }

        const room = await Rooms.findOne(
            {
                where: {
                    id: roomId
                }
            }
        )

        if (!room) {
            return res.status(404).json(
                {
                    success: true,
                    message: 'Room not found'
                }
            )
        }

        const previusReservations = await Access.find(
            {
                where: {
                    room_id: roomId,
                    entry_date: LessThanOrEqual(end),
                    exit_date: MoreThanOrEqual(start),
                    state: Not('cancelled')
                }
            }
        )

        if (previusReservations.length > 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'room are not available in the selected date range'
                }
            )
        }

        const newReservation = await Access.create(
            {
                user_id: userId,
                room_id: roomId,
                entry_date: start,
                exit_date: end
            }
        ).save()

        res.status(201).json(
            {
                success: true,
                message: 'reservation created',
                data: newReservation
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Internal error creating a new reservaton',
                error: error
            }
        )
    }
}

export const updateReservation = async (req: Request, res: Response) => {
    try {

        const reservationId = Number(req.params.reservationId)
        const { room_id, entry_date, exit_date } = req.body
        const date = new Date()
        const userId = req.tokenData.id

        if (!reservationId) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'reservation id is required'
                }
            )
        }

        if (!room_id && !entry_date && !exit_date) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'at least one value is required'
                }
            )
        }

        const start = new Date(entry_date)
        const end = new Date(exit_date)

        if (start < date || start > end) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'date range invalid'
                }
            )
        }

        const currentReservation = await Access.findOne(
            {
                where: {
                    id: reservationId,
                }
            }
        )

        if (!currentReservation) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'current reservation is not available or doesnt exist'
                }
            )
        }

        if (userId !== currentReservation.user_id) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'you are not allowed to change this reservation'
                }
            )
        }

        const previusReservations = await Access.find(
            {
                where: {
                    room_id: currentReservation.room_id,
                    entry_date: LessThanOrEqual(end),
                    exit_date: MoreThanOrEqual(start),
                    state: Not('cancelled')
                }
            }
        )

        if (previusReservations.length > 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'room are not available in the selected date range'
                }
            )
        }

        const body = {
            room_id: room_id || currentReservation.room_id,
            entry_date: start || currentReservation.entry_date,
            exit_date: end || currentReservation.exit_date
        }

        await Access.update(
            {
                id: reservationId
            }, body
        )

        res.status(200).json(
            {
                success: true,
                message: 'reservation updated successfully',
                data: body
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'internal error updating reservations'
            }
        )
    }
}

export const deleteReservation = async (req: Request, res: Response) => {
    try {

        const reservationId = Number(req.params.reservationId)
        const userId = req.tokenData.id

        if (!reservationId) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'reservation id is required'
                }
            )
        }

        const reservationDeleted = await Access.update(
            {
                id: reservationId,
                user_id: userId
            }, {
            state: 'cancelled'
        }
        )

        if (!reservationDeleted) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'reservation to delete not found'
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: 'reservation have been cancelled',
                data: reservationDeleted
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'internal error deleting reservation'
            }
        )
    }
}

export const userAccess = async (req: Request, res: Response) => {
    try {

        const userId = req.tokenData.id
        const roomId = Number(req.params.roomId)
        const date = new Date()

        if (!roomId) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'room id is required to access'
                }
            )
        }

        const roomToAccess = await Rooms.findOne(
            {
                where: {
                    id: roomId
                }
            }
        )

        if (!roomToAccess) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'room not found'
                }
            )
        }

        const userIn = await AccessHistory.find(
            {
                where: {
                    user_id: userId,
                    room_id: roomId,
                    exit_date: IsNull()
                }
            }
        )

        if (userIn.length > 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'you are already in'
                }
            )
        }

        const usersInRoom = await AccessHistory.createQueryBuilder('accessHistory')
            .where('accessHistory.room_id = :roomId', { roomId })
            .andWhere('accessHistory.exit_date IS NULL')
            .getCount()

        if (usersInRoom >= roomToAccess.capacity) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'acccess not granted because the room is already full'
                }
            )
        }

        const access = await AccessHistory.create(
            {
                user_id: userId,
                room_id: roomId,
                entry_date: date
            }
        ).save()

        res.status(200).json(
            {
                success: true,
                message: 'access granted',
                data: access
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'server internal error to allow access to user',
                error: error
            }
        )
    }
}