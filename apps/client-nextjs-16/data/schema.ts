import {
  int,
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const usersTable = sqliteTable("users", {
  // id: integer("id").primaryKey({ autoIncrement: true }),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  avatar: text("avatar"),
  role: text("role", {
    enum: ["ADMIN", "EDITOR", "USER"],
  }).notNull(),
  address: text("address", { mode: "json" }),
  paymentMethod: text("payment_method"),

  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
  createdBy: integer("created_by"),
  updatedBy: integer("updated_by"),
});

export const accountsTable = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ],
);

export const sessionsTable = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokensTable = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => [
    primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  ],
);

export const authenticatorsTable = sqliteTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: integer("credentialBackedUp", {
      mode: "boolean",
    }).notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  ],
);

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
  description: text(),
});
