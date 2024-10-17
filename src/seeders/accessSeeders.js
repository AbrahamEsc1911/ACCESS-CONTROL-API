

const { Access } = require('../database/models/Access'); 

const accesses = [
  {
    user_id: 1, 
    room_id: 1, 
    entry_date: new Date('2024-10-17T09:00:00Z'),
    exit_date: new Date('2024-10-17T10:00:00Z'),
    state: 'entry',
  },
  {
    user_id: 2, 
    room_id: 2, 
    entry_date: new Date('2024-10-17T11:00:00Z'),
    exit_date: new Date('2024-10-17T12:30:00Z'),
    state: 'entry',
  },
  {
    user_id: 3, 
    room_id: 3, 
    entry_date: new Date('2024-10-17T13:00:00Z'),
    exit_date: new Date('2024-10-17T15:00:00Z'),
    state: 'entry',
  },
];

const seedAccesses = async () => {
  try {
    await Access.bulkCreate(accesses);
    console.log('Accesses seeded successfully!');
  } catch (error) {
    console.error('Error seeding accesses:', error);
  }
};

module.exports = { seedAccesses };
