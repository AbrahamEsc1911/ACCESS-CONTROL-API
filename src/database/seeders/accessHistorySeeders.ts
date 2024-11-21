import { AppDataSource } from "../db";
import { AccessHistory } from "../models/AccessHistory";

export const accessHistories = async () => {
  try {
    await AppDataSource.initialize()

    const accessHistories = [
      {
        user_id: 1,
        room_id: 1,
        entry_date: new Date('2024-10-17T09:00:00Z'),
        exit_date: new Date('2024-10-17T10:00:00Z'),
      },
      {
        user_id: 2,
        room_id: 2,
        entry_date: new Date('2024-10-17T11:00:00Z'),
        exit_date: new Date('2024-10-17T12:30:00Z'),
      },
      {
        user_id: 3,
        room_id: 3,
        entry_date: new Date('2024-10-17T13:00:00Z'),
        exit_date: new Date('2024-10-17T15:00:00Z'),
      },
    ];

    const newAccesshistories = await createHistories(accessHistories)

    await AccessHistory.save(newAccesshistories)

    console.log('===========================');
    console.log('Access Histories seeder successfully');
    console.log('===========================');

  } catch (error: any) {

    console.log('----------------')
    console.log(`ERROR ACCESS HISTORIES SEEDERS ${error.message}`)
    console.log('----------------')

  } finally {
    await AppDataSource.destroy()
  }
}

const createHistories = async (arr: object[]) => {
  const newAccesshistories: AccessHistory[] = []

  arr.forEach((element: any) => {
    const history = new AccessHistory()
    history.user_id = element.user_id
    history.room_id = element.room_id
    history.entry_date = element.entry_date
    history.exit_date = element.exit_date
    newAccesshistories.push(history)
  })

  return newAccesshistories
}
