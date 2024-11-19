import { AppDataSource } from "../db";
import { Users } from "../models/Users";
import bcrypt from 'bcrypt'

export const userSeeders = async () => {
  try {

    await AppDataSource.initialize()

    const users = [
      {
        name: 'John Doe',
        StartUp: 'Tech Innovators',
        email: 'user@user.com',
        password: 'password',
        dni: '12345678A',
        phone: 1234567890,
        role: 'user',
      },
      {
        name: 'Jane Smith',
        StartUp: 'Creative Agency',
        email: 'admin@admin.com',
        password: 'password',
        dni: '87654321B',
        phone: 9876543210,
        role: 'admin',
      },
      {
        name: 'Alice Johnson',
        StartUp: 'Design Studio',
        email: 'alice@example.com',
        password: 'password',
        dni: '23456789C',
        phone: 1112223333,
        role: 'user',
      },
    ];

    const newUsers = await createUsers(users)

    await Users.save(newUsers)

    console.log('===========================');
    console.log('Users seeder successfully');
    console.log('===========================');

  } catch (error: any) {

    console.log('----------------')
    console.log(`ERROR USERS SEEDERS ${error.message}`)
    console.log('----------------')

  } finally {
    await AppDataSource.destroy()
  }
}

const createUsers = async (arr: object[]) => {
  const newUser: Users[] = []

  arr.forEach((element: any, index: any) => {

    const passHashed = bcrypt.hashSync(element.password, 10)

    const user = new Users()
    user.id = index + 1
    user.name = element.name
    user.StartUp = element.StartUp
    user.email = element.email
    user.password = passHashed
    user.dni = element.dni
    user.phone = element.phone
    user.role = element.role
    newUser.push(user)

  })

  return newUser;
}