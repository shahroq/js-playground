"use server";
import { tasksTable } from "@/data/schema";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { FormState } from "./types";

export async function getTasks() {
  return await db.select().from(tasksTable);
}

// TODO: use better validation (zod, etc.)/useContext for crud operation(?)
export async function createTaskReducer(
  prevFormState: FormState,
  formData: FormData,
) {
  const title = String(formData.get("title") || "").trim();
  const desc = String(formData.get("desc") || "").trim();
  const errors: string[] = [];

  // validate user input
  if (!title) errors.push("Title is required");
  if (!desc) errors.push("Desc is required");
  const values = { title, desc };

  if (errors.length) return { values, message: "Error List:", errors };

  // create a record in db
  try {
    const newTask = await db.insert(tasksTable).values({ title, desc });
    return { message: "Task created successfully" };
  } catch (e) {
    console.error(e);
    return {
      values,
      message: "Failed to create task",
      errors: ["Something went wrong"],
    };
  }
}

export async function updateTaskReducer(
  prevFormState: FormState,
  formData: FormData,
) {
  const id = Number(formData.get("id") || 0);
  const title = String(formData.get("title") || "").trim();
  const desc = String(formData.get("desc") || "").trim();
  const errors: string[] = [];

  // validate user input
  if (!title) errors.push("Title is required");
  if (!desc) errors.push("Desc is required");
  const values = { id, title, desc };

  if (errors.length) return { values, message: "Error List:", errors };

  // update a record in db
  try {
    const updatedTask = await db
      .update(tasksTable)
      .set({ title, desc })
      .where(sql`${tasksTable.id} = ${id}`)
      .returning();
    return { message: "Task updated successfully", values: updatedTask[0] };
  } catch (e) {
    console.error(e);
    return {
      values,
      message: "Failed to update task",
      errors: ["Something went wrong"],
    };
  }
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
