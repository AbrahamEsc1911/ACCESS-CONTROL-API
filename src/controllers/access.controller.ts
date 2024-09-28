import { Request, Response } from "express";
import { Access } from "../database/models/Access";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { Rooms } from "../database/models/Rooms";

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
                    exit_date: MoreThanOrEqual(start)
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

        const body = {
            room_id: room_id || currentReservation.room_id,
            entry_date: start || currentReservation.entry_date,
            exit_date: end || currentReservation.exit_date
        }

        const updatedReservation = await Access.update(
            {
                id: reservationId
            }, body
        )

        res.status(200).json(
            {
                success: true,
                message: 'reservation updated successfully',
                data: updatedReservation
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