
const { Rooms } = require('../database/models/Rooms'); 
const rooms = [
  {
    room: 'Conference Room A',
    capacity: 10,
    room_type: 'meeting',
  },
  {
    room: 'Conference Room B',
    capacity: 20,
    room_type: 'meeting',
  },
  {
    room: 'Private Office 1',
    capacity: 2,
    room_type: 'office',
  },
  {
    room: 'Co-Working Space',
    capacity: 50,
    room_type: 'coworking',
  },
];

const seedRooms = async () => {
  try {
    await Rooms.bulkCreate(rooms);
    console.log('Rooms seeded successfully!');
  } catch (error) {
    console.error('Error seeding rooms:', error);
  }
};

module.exports = { seedRooms };
