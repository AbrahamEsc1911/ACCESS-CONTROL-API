import { accessSeeders } from "./accessSeeders";
import { userSeeders } from "./userSeeders";

(async () => {
  console.log('starting seeders...');
  await userSeeders()
  // await accessSeeders()
  console.log('finishing seeders...');
})()