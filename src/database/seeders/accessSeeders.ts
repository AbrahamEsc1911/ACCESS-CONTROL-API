import { AppDataSource } from "../db";
import { Access } from "../models/Access";

export const accessSeeders = async () => {
  try {

    await AppDataSource.initialize()

    const accesses = [
      {
        user_id: 1,
        room_id: 1,
        entry_date: new Date('2024-10-17T09:00:00Z'),
        exit_date: new Date('2024-10-17T10:00:00Z'),
        state: 'used',
      },
      {
        user_id: 2,
        room_id: 2,
        entry_date: new Date('2024-10-17T11:00:00Z'),
        exit_date: new Date('2024-10-17T12:30:00Z'),
        state: 'no_show',
      },
      {
        user_id: 3,
        room_id: 3,
        entry_date: new Date('2024-10-17T13:00:00Z'),
        exit_date: new Date('2024-10-17T15:00:00Z'),
        state: 'cancelled',
      },
    ];

    const newAccess = await createAccesses(accesses)

    await Access.save(newAccess)

    console.log('===========================');
    console.log('Access seeder successfully');
    console.log('===========================');

  } catch (error: any) {

    console.log('----------------')
    console.log(`ERROR ACCESS SEEDERS ${error.message}`)
    console.log('----------------')

  } finally {
    await AppDataSource.destroy()
  }
}

const createAccesses = async (arr: object[]) => {
  const newAccess: Access[] = []

  arr.forEach((element: any) => {
    const access = new Access()
    access.user_id = element.user_id
    access.room_id = element.room_id
    access.entry_date = element.entry_date
    access.exit_date = element.exit_date
    access.state = element.state
    newAccess.push(access)
  })

  return newAccess
}