"use server";
import { revalidatePath } from "next/cache";
import { and, like, eq, asc, desc, count } from "drizzle-orm";
import { db } from "@/data";
import { tasksTable } from "@/data/schema";
import { taskSchema } from "@jsp/shared/validations/zod";
import { pause } from "@jsp/shared/utils";
import { TaskQuery } from "@jsp/shared/types";

const PAUSE = 500;
const DEFAULT_LIMIT = 2;

export async function getTasks(query?: TaskQuery) {
  await pause(PAUSE);

  const page = query?.page ?? 1;
  const limit = query?.limit ?? DEFAULT_LIMIT;
  const offset = (page - 1) * limit;

  // filter
  const filters = [];
  if (query?.term) filters.push(like(tasksTable.title, `%${query.term}%`));
  if (query?.status) filters.push(eq(tasksTable.status, query.status));

  // sort
  const sort = query?.sort ?? "-id";
  const descending = sort.startsWith("-");
  const field = descending ? sort.slice(1) : sort;
  let orderBy;
  switch (field) {
    case "title":
      orderBy = descending ? desc(tasksTable.title) : asc(tasksTable.title);
      break;
    case "status":
      orderBy = descending ? desc(tasksTable.status) : asc(tasksTable.status);
      break;
    case "id":
    default:
      orderBy = descending ? desc(tasksTable.id) : asc(tasksTable.id);
  }

  return db
    .select()
    .from(tasksTable)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset);
}

// with pagination data
export async function findTasks(query?: TaskQuery) {
  await pause(PAUSE);

  const page = query?.page ?? 1;
  const limit = query?.limit ?? DEFAULT_LIMIT;
  const offset = (page - 1) * limit;

  // Filter
  const filters = [];
  if (query?.term) filters.push(like(tasksTable.title, `%${query.term}%`));
  if (query?.status) filters.push(eq(tasksTable.status, query.status));

  const where = filters.length ? and(...filters) : undefined;

  // Sort
  const sort = query?.sort ?? "-id";
  const descending = sort.startsWith("-");
  const field = descending ? sort.slice(1) : sort;

  let orderBy;
  switch (field) {
    case "title":
      orderBy = descending ? desc(tasksTable.title) : asc(tasksTable.title);
      break;

    case "status":
      orderBy = descending ? desc(tasksTable.status) : asc(tasksTable.status);
      break;

    case "id":
    default:
      orderBy = descending ? desc(tasksTable.id) : asc(tasksTable.id);
  }

  const [items, [{ total }]] = await Promise.all([
    db
      .select()
      .from(tasksTable)
      .where(where)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset),

    db.select({ total: count() }).from(tasksTable).where(where),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    items,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasPrevious: page > 1,
      hasNext: page < totalPages,
    },
  };
}

export async function getTask(id: number) {
  return db.query.tasksTable.findFirst({
    where: eq(tasksTable.id, id),
  });
}

export async function deleteTask(id: number) {
  await pause(PAUSE);

  await db.delete(tasksTable).where(eq(tasksTable.id, id));
  revalidatePath("/shadcn/tasks");
}

export async function updateTask(prevState: unknown, formData: FormData) {
  await pause(PAUSE);
  const id = Number(formData.get("id"));

  try {
    const task = taskSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
    });

    await db
      .update(tasksTable)
      .set({ title: task.title, description: task.description })
      .where(eq(tasksTable.id, id));

    revalidatePath("/shadcn/tasks");

    return { success: true, message: "Task updated successfully" };
  } catch (e) {
    return { success: false, message: JSON.stringify(e) };
  }
}

export async function createTask(prevState: unknown, formData: FormData) {
  await pause(PAUSE);

  try {
    const task = taskSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
    });

    await db.insert(tasksTable).values({
      title: task.title,
      description: task.description,
    });

    revalidatePath("/shadcn/tasks");

    return {
      success: true,
      message: "Task created successfully",
    };
  } catch (e) {
    return {
      success: false,
      message: JSON.stringify(e),
    };
  }
}
