import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { Users } from "../database/models/Users";

export const register = async (req: Request, res: Response) => {
    try {

        const { email, name, password, StartUp, dni, phone } = req.body

        if (!email || !password || !StartUp || !dni || !phone) {
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
        if (dni.length !== 9) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'check DNI'
                }
            )
        }

        const passHashed = bcrypt.hashSync(password, 10)

       const newUser = await Users.create(
        {
            name: name,
            email: email,
            password: passHashed,
            StartUp: StartUp,
            dni: dni,
            phone: phone
        }
       ).save()

       const { password: pass, ...userWithoutPassword } = newUser;

       res.json({
        success: true,
        message: 'user created',
        data: userWithoutPassword
       })

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