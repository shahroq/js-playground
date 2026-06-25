import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Please enter a valid email address").trim(),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export const accountSchema = z.object({
  name: z.string().min(3, "Name must be at least 5 characters"),
});
