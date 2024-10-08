import { Request, Response } from "express";
import { AccessHistory } from "../database/models/AccessHistory";
import { Between } from "typeorm";

export const accessHistory = async (req: Request, res: Response) => {
    try {

        const { start_date, end_date } = req.query

        if (!start_date || !end_date) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'start date and end date are required'
                }
            )
        }

        const startDate = new Date(String(start_date))
        const endDate = new Date(String(end_date))

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Invalid date format, Please use YYYY-MM-DD format'
                }
            )
        }

        const accessHistory = await AccessHistory.find(
            {
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
                    entry_date: Between(startDate, endDate)
                },
                relations: {
                    room: true,
                    user: true
                }
            }
        )

        if (accessHistory.length === 0) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Nothin to show'
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: 'Showing the report of acccess',
                data: accessHistory
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Internal error retriving access history',
                error: error
            }
        )
    }
}

export const accessHistoriesRoomById = async (req: Request, res: Response) => {
    try {

        const roomId = Number(req.params.id)
        const { start_date, end_date } = req.query

        if (!roomId || !start_date || !end_date) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'all values are required'
                }
            )
        }

        const startDate = new Date(String(start_date))
        const endDate = new Date(String(end_date))

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || isNaN(roomId)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Invalid date format, Please use YYYY-MM-DD format'
                }
            )
        }

        const historiesById = await AccessHistory.find(
            {
                where: {
                    room_id: roomId,
                    entry_date: Between(startDate, endDate)
                },
                relations: {
                    room: true,
                    user: true
                }
            }
        )

        if (historiesById.length === 0) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'no history to show'
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: 'showing access histories of room by id and range of dates',
                data: historiesById
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'internal error getting access histories by room id',
                error: error
            }
        )
    }
}

export const accessHistoryCurrentMonthByUser = async (req: Request, res: Response) => {
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
        const accessHistory = await AccessHistory.find({
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
                entry_date: Between(startDate, endDate)
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

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal error retrieving access history',
            error: error
        });
    }
};