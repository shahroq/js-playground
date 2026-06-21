"use server";

import { eq } from "drizzle-orm";
import { db } from "@/data";
import { productsTable } from "@/data/schema";

type Options = {
  limit?: number;
  offset?: number;
  orderBy?: string;
};

export async function getProducts(options?: Options) {
  let query = db.select().from(productsTable).$dynamic();

  if (options?.limit) query = query.limit(options.limit);
  if (options?.offset) query = query.offset(options.offset);

  return await query;
}

export async function getProductById(id: number) {
  const result = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, id))
    .limit(1);

  return result[0] ?? null;
}
