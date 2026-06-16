"use server";

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
