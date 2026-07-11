import z from "zod";
import type { accountSchema, signInSchema } from "@/validations/zod";

export type User = {
  id?: string | number;
  email: string;
  password?: string;
  name?: string;
  avatar?: string;
};

export const userInitValues: User = {
  email: "",
  password: "",
  name: "",
  avatar: "",
};

export type SignIn = z.infer<typeof signInSchema>;

export type Account = z.infer<typeof accountSchema>;
