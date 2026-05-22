"use server";

import { tasksTable } from "@/data/schema";
import { db } from "@/lib/db";
import { InferSelectModel, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

type Task = InferSelectModel<typeof tasksTable>;

export async function getTasks() {
  return await db.select().from(tasksTable);
}

export async function createTask(task: FormData) {
  const title = task.get("title") as string;
  const desc = task.get("desc") as string;

  // validate user input

  // create a record in db
  const newTask = await db.insert(tasksTable).values({ title, desc });

  // redirect to list
  redirect("/tasks/w-orm");
}

export async function updateTask(id: number, task: FormData) {
  // console.log(`Here I am at actions with id=${id} & task=${task}`);

  const title = task.get("title");
  const desc = task.get("desc");

  // TODO: use better validation (zod, etc.)
  // Basic validation for user input
  if (!title) throw new Error("Title is required");

  // update a record in db
  const updatedTask = await db
    .update(tasksTable)
    .set({ title, desc })
    .where(sql`${tasksTable.id} = ${id}`);

  console.log(`Task Updated...`);
  console.log(updatedTask);

  redirect(`/tasks/w-orm`);
}

export async function deleteTask(id: number) {
  const deletedTask = await db
    .delete(tasksTable)
    .where(sql`${tasksTable.id} = ${id}`)
    .returning();

  console.log(`deleted Updated...`);
  console.log(deletedTask);

  redirect(`/tasks/w-orm`);
}
