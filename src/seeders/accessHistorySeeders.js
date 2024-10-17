

const { AccessHistory } = require('../database/models/AccessHistory'); 

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

const seedAccessHistories = async () => {
  try {
    await AccessHistory.bulkCreate(accessHistories);
    console.log('Access Histories seeded successfully!');
  } catch (error) {
    console.error('Error seeding access histories:', error);
  }
};

module.exports = { seedAccessHistories };
