
const { Users } = require('../database/models/Users');

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

const userSeeder = async () => {
  try {
    await Users.bulkCreate(users);
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

module.exports = { userSeeder };
