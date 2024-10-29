import { accessSeeders } from "./accessSeeders";
import { roomSeeders } from "./roomSeeders";
import { userSeeders } from "./userSeeders";

(async () => {
  console.log('starting seeders...');
  await userSeeders()
  await roomSeeders()
  await accessSeeders()
  console.log('finishing seeders...');
})()