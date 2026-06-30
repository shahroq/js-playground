"use server";
import { db } from "@/data";
import { productsTable } from "@/data/schema";
// import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";
// import { sql } from "drizzle-orm";

export async function getProducts() {
  return await db.select().from(productsTable);
}
