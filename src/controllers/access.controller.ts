import { Request, Response } from "express";
import { Access } from "../database/models/Access";
import { Between } from "typeorm";

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

export const getAllReservations = async (req: Request, res: Response) => {
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