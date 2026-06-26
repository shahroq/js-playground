import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Please enter a valid email address").trim(),
  password: z.string().min(5, "Password must be at least 5 characters"),
  // .regex(/[A-Z]/, "Must contain an uppercase letter")
  // .regex(/[a-z]/, "Must contain a lowercase letter")
  // .regex(/[0-9]/, "Must contain a number")
  // .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
});

export const accountSchema = z.object({
  name: z.string().min(3, "Name must be at least 5 characters"),
});
