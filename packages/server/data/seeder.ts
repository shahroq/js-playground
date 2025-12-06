import dbSource from "./data-source.json";
import { UserRepository } from "@users/repository";
import { ProductRepository } from "@products/repository";
import { ReviewRepository } from "@reviews/repository";
import { getDBAdapter } from "@/common/db-adapter/factory";

let dbAdapter = getDBAdapter(); // used for migration directly
const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const reviewRepository = new ReviewRepository();

// insted of map them manually
const users = dbSource.users.map((u) => ({
  name: u.name,
  email: `${u.email}.${Math.random()}`,
  role: u.role as Role,
}));

const products = dbSource.products.map((i) => ({
  name: i.name,
  description: i.description,
  price: parseFloat(i.price),
  category: i.category,
  in_stock: Boolean(i.in_stock),
  created_by: i.created_by,
  updated_by: i.updated_by,
}));

const reviews = dbSource.reviews.map((i) => ({
  product_id: Number(i.product_id),
  content: i.content,
  rating: i.rating,
  created_by: i.created_by,
  updated_by: i.updated_by,
}));

// run seeder
export const main = async () => {
  // 1: migrate db (create db files(.db/.json) or create db in db engine/for all envs (prod/test)
  console.log("Stage 1: Running migration (creating databases)...");
  await dbAdapter.migrate();

  // TODO: 2-A: map data with class-transformer to learn the concept

  console.log("Stage 2: Running seeder...");
  // 2: seed data
  if (1) {
    await seedUsers(users);
    await seedProducts(products);
    await seedReviews(reviews);
    console.log("Data seeder completed.");
  }
};

async function seedUsers(data, reset: boolean = true) {
  if (reset) await userRepository.deleteMany();
  for (const u of data) await userRepository.create(u);
  console.log(`Seeded ${data.length} users.`);
}

async function seedProducts(data, reset: boolean = true) {
  if (reset) await productRepository.deleteMany();
  for (const p of data) await productRepository.create(p);
  console.log(`Seeded ${data.length} products.`);
}

async function seedReviews(data, reset: boolean = true) {
  if (reset) await reviewRepository.deleteMany();
  for (const r of data) await reviewRepository.create(r);
  console.log(`Seeded ${data.length} reviews.`);
}

main();
