import { dbAdapter } from "@/common/container";
//  import { seed as seedUsers } from "@/routes/v1/users/seeder";
import { seed as seedReviews } from "@/routes/v1/reviews/seeder";
import { seed as seedProducts } from "@/routes/v1/products/seeder";

// run seeder
export const main = async () => {
  // 1: migrate db (create db files(.db/.json) or create db in db engine/for all envs (prod/test)
  console.log("Stage 1: Running migration (creating databases)...");
  await dbAdapter.migrate();

  // TODO: 2-A: map data with class-transformer to learn the concept

  console.log("Stage 2: Running seeder...");
  // 2: seed data
  if (1) {
    // await seedUsers();
    await seedReviews();
    await seedProducts();
    console.log("Data seeder completed.");
  }
};

main();
