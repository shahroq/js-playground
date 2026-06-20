import z from "zod";
import { signInSchema } from "./validations";

export type SignIn = z.infer<typeof signInSchema>;
