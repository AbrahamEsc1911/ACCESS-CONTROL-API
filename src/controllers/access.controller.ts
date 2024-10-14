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

export const getFutureReservationsByUserId = async (req: Request, res: Response) => {

    const userId = Number(req.tokenData.id)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {

        const allReservations = await Access.find({
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
                entry_date: Between(today, new Date(9999, 11, 31)) // Hasta una fecha futura lejana
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
                    success: false,
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

export const entryAccess = async (req: Request, res: Response) => {
    try {

        const userId = req.tokenData.id
        const roomId = Number(req.params.roomId)
        const date = new Date()
        const timeLimitInMins = 30

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

        const reservations = await Access
            .createQueryBuilder('reservation')
            .where('reservation.user_id = :userId', { userId })
            .andWhere('reservation.room_id = :roomId', { roomId })
            .andWhere('DATE(reservation.entry_date) = DATE(:date)', { date })
            .getMany();

        if (reservations.length > 0) {
            reservations.forEach(async (reservation) => {
                const entryDate = reservation.entry_date

                const differenceInMs = entryDate.getTime() - date.getTime()
                const differenceInMins = differenceInMs / (1000 * 60)

                if ((differenceInMins >= -10 && differenceInMins <= 0) || (differenceInMins > 0 && differenceInMins <= timeLimitInMins))

                    await Access.update(
                        {
                            user_id: userId,
                            room_id: roomId
                        },
                        {
                            state: 'used'
                        }
                    )
            })
        }

        const usersInRoom = await AccessHistory
            .createQueryBuilder('accessHistory')
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

export const exitAccess = async (req: Request, res: Response) => {
    try {

        const userId = req.tokenData.id
        const date = new Date()



        const userOut = await AccessHistory.update(
            {
                user_id: userId,
                exit_date: IsNull()
            },
            {
                exit_date: date
            }
        )

        if (userOut.affected === 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'you have to access first before exit the room'
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: 'you are out now, thanks for comming',
                data: userOut
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'server internal error exiting access',
                error: error
            }
        )
    }
}

export const currentRoom = async (req: Request, res: Response) => {
    try {
        const roomId = Number(req.params.roomId)

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
                    success: false,
                    message: 'room not found'
                }
            )
        }

        const roomStatus = await AccessHistory.find(
            {
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
                    exit_date: IsNull()
                },
                relations: {
                    user: true
                }
            }
        )

        if (roomStatus.length <= 0) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'the room is currently empty'
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: `curren state of room with id: ${roomId} and are ${roomStatus.length} people now`,
                roomData: room,
                data: roomStatus
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'internal error generting information of current room',
                error: error
            }
        )
    }
}