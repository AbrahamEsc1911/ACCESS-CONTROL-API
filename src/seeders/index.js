// src/seeders/index.js

const { seedUsers } = require('./userSeeders');
const { seedRooms } = require('.src/seeders/roomSeeders.js');
const { seedAccesses } = require('./src/seeders/accessSeeders.js');
const { seedAccessHistories } = require('./src/seeders/accessHistorySeeders.js');

const runSeeders = async () => {
  await seedUsers();
  await seedRooms();
  await seedAccesses();
  await seedAccessHistories(); 
};

runSeeders()
  .then(() => {
    console.log('All seeders executed successfully!');
    process.exit(0); 
  })
  .catch((error) => {
    console.error('Error executing seeders:', error);
    process.exit(1); 
  });
