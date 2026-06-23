// import { seed } from "drizzle-seed";
import { faker } from "@faker-js/faker";
import { sql } from "drizzle-orm";

import {
  tasksTable,
  productsTable,
  reviewsTable,
  usersTable,
  categoriesTable,
} from "./schema";
import { db } from ".";
import { hashPassword } from "@/auth/utils";

async function main() {
  await truncateTables();

  const usersData = await userSeed();
  const categoryData = await categorySeed();

  const productsData = await productSeed(usersData, categoryData);
  await reviewSeed(usersData, productsData);

  await taskSeed();

  console.log("🌱 Seeding completed");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});

async function truncateTables() {
  // order matters because of foreign keys
  await db.delete(reviewsTable);
  await db.delete(productsTable);
  await db.delete(tasksTable);
  await db.delete(categoriesTable);
  await db.delete(usersTable);

  // reset sqlite autoincrement ids
  await db.run(sql`
    DELETE FROM sqlite_sequence
    WHERE name IN (
      'reviews',
      'products',
      'tasks',
      'categories',
      'users'
    )
  `);
}

async function userSeed() {
  const password = await hashPassword("123456");

  return await db
    .insert(usersTable)
    .values([
      {
        name: faker.person.fullName(),
        email: "admin@email.com",
        password,
        avatar: "avatar-01.png",
        role: "ADMIN",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: faker.person.fullName(),
        email: "editor@email.com",
        password,
        avatar: "avatar-02.png",
        role: "EDITOR",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: faker.person.fullName(),
        email: "user@email.com",
        password,
        role: "USER",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
    .returning();
}

const categorySeed = async () => {
  return await db
    .insert(categoriesTable)
    .values([
      { title: "Electronics" },
      { title: "Books" },
      { title: "Clothing" },
    ])
    .returning();
};

const productSeed = async (usersData: any[], categoryData: any[]) => {
  return await db
    .insert(productsTable)
    .values(
      Array.from({ length: 5 }).map((_, i) => {
        const user = faker.helpers.arrayElement(usersData);
        const category = faker.helpers.arrayElement(categoryData);

        const imageCount = faker.number.int({ min: 0, max: 3 });
        const images = Array.from({ length: imageCount }).map((_, j) => {
          const index = String(i + 1).padStart(2, "0");
          if (j === 0) return `product-${index}.jpg`;
          // else:
          const subIndex = String(j + 1).padStart(2, "0");
          return `product-${index}-${subIndex}.jpg`;
        });
        return {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.number.float({
            min: 10,
            max: 1000,
            fractionDigits: 2,
          }),
          category: category.id,
          inStock: faker.datatype.boolean(),
          images,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: user.id,
          updatedBy: user.id,
        };
      }),
    )
    .returning();
};

const reviewSeed = async (usersData: any[], productData: any[]) => {
  // leave at least one product without reviews
  const reviewableProducts = productData.slice(0, 4);

  await db.insert(reviewsTable).values(
    Array.from({ length: 10 }).map(() => {
      const user = faker.helpers.arrayElement(usersData);
      const product = faker.helpers.arrayElement(reviewableProducts);

      return {
        productId: product.id,
        content: faker.lorem.paragraph(),
        rating: faker.number.int({ min: 1, max: 5 }),
        status: faker.helpers.arrayElement(["approved", "pending", "rejected"]),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: user.id,
        updatedBy: user.id,
      };
    }),
  );
};

const taskSeed = async () => {
  await db.insert(tasksTable).values(
    Array.from({ length: 5 }).map(() => ({
      title: faker.company.buzzPhrase(),
      desc: faker.lorem.paragraph(),
    })),
  );
};
