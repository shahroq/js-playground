import type { RHFValidationAdapter } from "../types";
import type { Task } from "../../types/types";
import { taskRules } from "./task.schema";

export const rhfTaskValidation: RHFValidationAdapter<Task> = {
  rules: taskRules,
  resolver: undefined,
};
