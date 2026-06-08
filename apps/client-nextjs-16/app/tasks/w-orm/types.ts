import { tasksTable } from "@/data/schema";
import { InferSelectModel } from "drizzle-orm";

/*
export type Task = {
  id: number;
  title: string;
  description?: string;
};
*/

export type Task = InferSelectModel<typeof tasksTable>;

export type FormState = {
  values?: Partial<Task>;
  message?: string;
  errors?: string[];
};
