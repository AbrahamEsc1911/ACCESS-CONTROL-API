import { AppDataSource } from "../db";
import { Rooms } from "../models/Rooms";

export const roomSeeders = async () => {
  try {

    await AppDataSource.initialize()

    const rooms = [
      {
        room: 'Conference Room A',
        room_type: 'meetings',
        capacity: 10,
      },
      {
        room: 'Conference Room B',
        capacity: 20,
        room_type: 'meetings',
      },
      {
        room: 'Private Office 1',
        capacity: 2,
        room_type: 'office',
      },
      {
        room: 'Co-Working Space',
        capacity: 50,
        room_type: 'meetings',
      },
    ];

    const newRoom = await createRooms(rooms)

    await Rooms.save(newRoom)

    console.log('===========================');
    console.log('Rooms seeder successfully');
    console.log('===========================');

  } catch (error: any) {
    console.log('===========================');
    console.log('Error Rooms Seeders', error.message);
    console.log('===========================');

  } finally {
    await AppDataSource.destroy()
  }
}

const createRooms = async (arr: object[]) => {
  const newRoom: Rooms[] = []

  arr.forEach((element: any, index: any) => {

    const room = new Rooms()

    room.id = index + 1
    room.room = element.room
    room.capacity = element.capacity
    room.room_type = element.room_type
    newRoom.push(room)
  })

  return newRoom
}
