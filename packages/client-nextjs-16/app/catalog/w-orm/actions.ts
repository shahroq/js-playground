"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { productsTable } from "@/data/schema";

export async function getProducts() {
  return await db.select().from(productsTable);
}
