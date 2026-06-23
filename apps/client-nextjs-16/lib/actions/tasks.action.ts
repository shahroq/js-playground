"use server";
import { and, like } from "drizzle-orm";
import { db } from "@/data";
import { tasksTable } from "@/data/schema";
import { pause } from "@jsp/shared/utils";
import { TaskQuery } from "@jsp/shared/types";

export async function getTasks(query?: TaskQuery) {
  await pause(2500);

  const page = query?.page ?? 1;
  const limit = query?.limit ?? 5;
  const offset = (page - 1) * limit;

  const filters = [];

  if (query?.term) filters.push(like(tasksTable.title, `%${query.term}%`));

  return db
    .select()
    .from(tasksTable)
    .where(filters.length ? and(...filters) : undefined)
    .limit(limit)
    .offset(offset);
}
