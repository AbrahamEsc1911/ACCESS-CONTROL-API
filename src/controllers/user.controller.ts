import { Request, Response } from "express"
import { Users } from "../database/models/Users"
import { AccessHistory } from "../database/models/AccessHistory"
import { IsNull } from "typeorm"

export const userCurrentAccess = async (req: Request, res: Response) => {
    try {

        const userId = Number(req.params.id)

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
                    success: true,
                    message: 'user has no records yet'
                }
            )
        }

        res.status(200).json(
            {
                success: true,
                message: 'curren state of user',
                data: userCurrent
            }
        )

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