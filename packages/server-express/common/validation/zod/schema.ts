import { z } from "zod";
import { ReviewStatus } from "@/routes/v1/reviews/types.d";

/**
 * Shared Schemas
 */
const sharedSchemas = {
  findAll: {
    query: z.object({
      page: z.coerce.number().int().min(1).default(1),
      per_page: z.coerce.number().int().min(1).max(100).default(10),
      category: z.string().optional(),
      in_stock: z.boolean().optional(),
    }),
  },
  findOne: {
    params: z.object({
      id: z.coerce.number().int(),
    }),
  },
};

/**
 * User Schemas
 */
const createUser = {
  body: z.object({
    name: z.string(),
    email: z.string().nullable(),
    price: z.number().positive().nullable().optional(),
    category: z.string(),
    in_stock: z.boolean(),
  }),
};

const updateUser = {
  params: sharedSchemas.findOne.params,
  body: z.object({
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    price: z.number().positive().nullable().optional(),
    category: z.string().optional(),
    in_stock: z.boolean().optional(),
  }),
};

/**
 * Product Schemas
 */
const createProduct = {
  body: z.object({
    name: z.string(),
    description: z.string().nullable().optional(),
    price: z.number().positive().nullable().optional(),
    category: z.string(),
    in_stock: z.boolean(),
  }),
};

const updateProduct = {
  params: sharedSchemas.findOne.params,
  body: z.object({
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    price: z.number().positive().nullable().optional(),
    category: z.string().optional(),
    in_stock: z.boolean().optional(),
  }),
};

/**
 * Review Schemas
 */
const createReview = {
  body: z.object({
    product_id: z.number().int(),
    content: z.string().nullable().optional(),
    rating: z.number().int().min(1).max(5),
    status: z.enum(ReviewStatus).optional(),
  }),
};

const updateReview = {
  params: sharedSchemas.findOne.params,
  body: z.object({
    rating: z.number().int().min(1).max(5).optional(),
    content: z.string().nullable().optional(),
    status: z.enum(ReviewStatus).optional(),
  }),
};

const updateReviewStatus = {
  params: sharedSchemas.findOne.params,
  body: z.object({
    status: z.enum(ReviewStatus).optional(),
  }),
};

/**
 * Export combined schemas
 */
export const schemas = {
  products: {
    ...sharedSchemas,
    create: createProduct,
    update: updateProduct,
    delete: sharedSchemas.findOne,
  },
  reviews: {
    ...sharedSchemas,
    create: createReview,
    update: updateReview,
    delete: sharedSchemas.findOne,
  },
};
