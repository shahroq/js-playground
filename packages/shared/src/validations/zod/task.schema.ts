import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Zod: Title must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Zod: Description must be at least 10 characters"),
  category: z.string().min(1, "Zod: Category is required").optional(),
});
