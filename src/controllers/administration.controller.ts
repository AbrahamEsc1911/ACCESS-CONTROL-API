import { Request, Response } from "express";
import { Access } from "../database/models/Access";
import { Between } from "typeorm";

export const dailyReport = async (req: Request, res: Response) => {
    try {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)

        const currentTime = new Date()
        const timeLimitInMins = 30

        const reservations = await Access.find(
            {
                where: {
                    entry_date: Between(today, tomorrow)
                }
            }
        )

        for (const reservation of reservations) {
            const entryDate = new Date(reservation.entry_date)

            if (reservation.state === 'reserved') {
                const differenceInMs = currentTime.getTime() - entryDate.getTime()
                const differenceInMins = differenceInMs / (1000 * 60)

                if (differenceInMins > timeLimitInMins) {
                    await Access.update(
                        {
                            id: reservation.id
                        },
                        {
                            state: 'no_show'
                        }
                    )
                }
            }
        }

        const dailyReport = await Access.find(
            {
                where: {
                    entry_date: Between(today, tomorrow)
                }
            }
        )

        if (dailyReport.length == 0) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'no records to show',
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: 'Showing a daily report',
                data: dailyReport
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Internar error genereting a daily report',
                error: error
            }
        )
    }
}

export const report = async (req: Request, res: Response) => {
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

        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        const currentTime = new Date()
        const timeLimitInMins = 30

        const reservations = await Access.find(
            {
                where: {
                    entry_date: Between(startDate, endDate)
                }
            }
        )

        for (const reservation of reservations) {
            const entryDate = new Date(reservation.entry_date)

            if (reservation.state === 'reserved') {
                const differenceInMs = currentTime.getTime() - entryDate.getTime()
                const differenceInMins = differenceInMs / (1000 * 60)

                if (differenceInMins > timeLimitInMins) {
                    await Access.update(
                        {
                            id: reservation.id
                        },
                        {
                            state: 'no_show'
                        }
                    )
                }
            }
        }

        const report = await Access.find(
            {
                where: {
                    entry_date: Between(startDate, endDate)
                }
            }
        )

        return res.status(200).json({
            success: true,
            message: 'Showing a report for the given date range.',
            data: report,
        });

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'internal error retriving report',
                error: error
            }
        )
    }
}