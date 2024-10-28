import { accessSeeders } from "./accessSeeders";

(async () => {
  console.log('starting seeders...');
  await accessSeeders()
  console.log('finishing seeders...');
})()