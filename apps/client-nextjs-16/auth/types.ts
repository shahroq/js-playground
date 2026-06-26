import { accountSchema, signInSchema } from "@jsp/shared/validations/zod";
import z from "zod";

export type SignIn = z.infer<typeof signInSchema>;

export type Account = z.infer<typeof accountSchema>;
