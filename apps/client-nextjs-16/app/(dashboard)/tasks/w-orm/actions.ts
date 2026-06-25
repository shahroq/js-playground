"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql } from "drizzle-orm";
import { db } from "@/data";
import { tasksTable } from "@/data/schema";
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
  const description = String(formData.get("description") || "").trim();
  const errors: string[] = [];

  // validate user input
  if (!title) errors.push("Title is required");
  if (!description) errors.push("Description is required");
  const values = { title, description };

  if (errors.length) return { values, message: "Error List:", errors };

  // create a record in db
  try {
    const newTask = await db.insert(tasksTable).values({ title, description });
    revalidatePath("/tasks/w-orm");
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
  const description = String(formData.get("description") || "").trim();
  const errors: string[] = [];

  // validate user input
  if (!title) errors.push("Title is required");
  if (!description) errors.push("Description is required");
  const values = { id, title, description };

  if (errors.length) return { values, message: "Error List:", errors };

  // update a record in db
  try {
    const updatedTask = await db
      .update(tasksTable)
      .set({ title, description })
      .where(sql`${tasksTable.id} = ${id}`)
      .returning();
    revalidatePath("/tasks/w-orm");
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
