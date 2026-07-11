import { z } from "zod";
import type { postSchema } from "@/validations/zod";

export type Post = z.infer<typeof postSchema>;
