import { z } from "zod";

/*
const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places",
  );
*/

const currency = z
  .string()
  .regex(/^\d+(\.\d{2})$/, "Price must have exactly two decimal places")
  .transform((val) => Number(val));

export const productSchema = z.object({
  // id: z.number().int().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: currency,
  category: z.number().int().nullable().optional(),
  inStock: z.boolean(),
  images: z.array(z.string()).default([]),
  // createdAt: z.string().datetime().optional(),
  // updatedAt: z.string().datetime().optional(),
  // createdBy: z.number().int().optional(),
  // updatedBy: z.number().int().optional(),
});
