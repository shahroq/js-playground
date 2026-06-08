import type { RHFValidationAdapter } from "./types";
import type { Task } from "../types/types";

const requiredRule = (field: string) => `${field} is required`;
const minLengthRule = (field: string, min: number) => ({
  value: min,
  message: `${field} must be at least ${min} characters`,
});

const taskRules = {
  title: {
    required: requiredRule("Title"),
    minLength: minLengthRule("Title", 3),
  },

  description: {
    required: requiredRule("Description"),
    minLength: minLengthRule("Description", 5),
  },

  category: {
    required: requiredRule("Category"),
  },
} as const;

export const rhfTaskValidation: RHFValidationAdapter<Task> = {
  rules: taskRules,
  resolver: undefined,
};
