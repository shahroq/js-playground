import z from "zod";
import { accountSchema, signInSchema } from "./validations";

export type SignIn = z.infer<typeof signInSchema>;

export type Account = z.infer<typeof accountSchema>;
