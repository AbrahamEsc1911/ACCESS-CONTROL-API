import jwt from 'jsonwebtoken'
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

export const registerAdmin = async (req: Request, res: Response) => {
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

       const newAdmin = await Users.create(
        {
            name: name,
            email: email,
            password: passHashed,
            StartUp: StartUp,
            dni: dni,
            phone: phone,
            role: 'admin'
        }
       ).save()

       const { password: pass, ...userWithoutPassword } = newAdmin;

       res.json({
        success: true,
        message: 'admin created',
        data: userWithoutPassword
       })

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Internal Error creating new admin',
                error: error
            }
        )
    }
}

export const login = async (req: Request, res: Response) => {
    try {

        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'email and password are required'
                }
            )
        }

        const user = await Users.findOne(
            {
                where: { email: email}
            }
        )

        if(!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'email or pasword invalid'
                }
            )
        }

        const passCompared = bcrypt.compareSync(password, user.password)

        if(!passCompared) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'email or password invalid'
                }
            )
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                email: user.email
            },
            process.env.SECRET_KEY as string
        )

        res.json(
            {
                success: true,
                message: 'user logged',
                token: token
            }
        )
        
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Server error while login',
                error: error
            }
        )
    }
}