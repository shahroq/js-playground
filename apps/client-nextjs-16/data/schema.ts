import { int, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role", {
    enum: ["ADMIN", "EDITOR", "USER"],
  }).notNull(),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
  createdBy: integer("created_by"),
  updatedBy: integer("updated_by"),
});

export const productsTable = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  category: integer("category"),
  inStock: integer("in_stock", { mode: "boolean" }).notNull(),
  images: text("images", { mode: "json" })
    .$type<string[]>()
    .notNull()
    .default([]),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
  createdBy: integer("created_by"),
  updatedBy: integer("updated_by"),
});

export const reviewsTable = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productId: integer("product_id").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  status: text("status", {
    enum: ["approved", "pending", "rejected"],
  }).notNull(),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
  createdBy: integer("created_by"),
  updatedBy: integer("updated_by"),
});

export const categoriesTable = sqliteTable("categories", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
});

export const tasksTable = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  desc: text(),
});
