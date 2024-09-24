import { Request, Response } from "express";
// import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
    try {

        const { email, password, StartUp, dni, phone } = req.body

        if (!email || !password || !StartUp || !dni || phone) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'All values are requiered'
                }
            )
        }

        if (password.length < 8 || password.length > 12) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'The password must be between 8 and 12 characters long'
                }
            )
        }

        //TODO MIRAR SI HAY MAS VALIDACIONES, HASHEAR LA CONTRASENA Y GUARDAR LOS DATOS EN LA BD

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Internal Error creating new user',
                error: error
            }
        )
    }
}