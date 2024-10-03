import { Request, Response } from "express";
import { AccessHistory } from "../database/models/AccessHistory";
import { Between } from "typeorm";

export const accessHistory = async (req: Request, res : Response) => {
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

        if(accessHistory.length === 0) {
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