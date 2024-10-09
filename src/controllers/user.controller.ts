import { json, Request, Response } from "express"
import { Users } from "../database/models/Users"
import { AccessHistory } from "../database/models/AccessHistory"
import { IsNull } from "typeorm"

export const userCurrentAccess = async (req: Request, res: Response) => {
    try {

        const userId = req.tokenData.id

        const user = await Users.findOne(
            {
                where: {
                    id: userId
                }
            }
        )

        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'user not found'
                }
            )
        }

        const userCurrent = await AccessHistory.findOne(
            {
                select: {
                    user: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        StartUp: true
                    },
                },
                where: {
                    user_id: userId
                },
                order: {
                    id: 'DESC'
                },
                relations: {
                    room: true,
                    user: true
                }
            }
        )

        if (!userCurrent) {
            return res.status(200).json(
                {
                    success: false,
                    message: 'user has no records yet'
                }
            )
        }

        if (!userCurrent.exit_date) {
            return res.status(200).json({
                success: true,
                message: 'The user is still inside the premises',
                data: userCurrent
            })
        } else {
            return res.status(200).json(
                {
                    success: false,
                    message: 'User is out installations',
                    data: userCurrent
                })
        }

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'server internal error getting curren access of user',
                error: error
            }
        )
    }
}

export const accessHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.id
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;


        if (!userId) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'user id is required'
                }
            )
        }

        const [userHistory, total] = await AccessHistory.findAndCount(
            {
                select: {
                    user: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        StartUp: true
                    },
                },
                where: {
                    user_id: userId
                },
                relations: {
                    room: true,
                    user: true
                },
                skip: skip,
                take: limit,
            }
        )

        if (userHistory.length === 0) {
            return res.status(200).json(
                {
                    success: true,
                    message: 'User has not any records yet'
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: 'user access history',
                data: userHistory,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: true,
                messaga: 'Internal error retriving user access history',
                error: error
            }
        )
    }
}

export const userProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.id

        if (!userId) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'you are not allowed'
                }
            )
        }

        const profile = await Users.findOne(
            {
                select: {
                    name: true,
                    StartUp: true,
                    email: true,
                    dni: true,
                    phone: true
                },
                where: {
                    id: userId
                }
            }
        )

        if (!profile) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'user not found or deleted'
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: 'user profile retrived',
                data: profile
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'internal server error retriving user profile',
                error: error
            }
        )
    }
}