import Joi from "joi";
import { ReviewStatus } from "@/routes/v1/reviews/types.d";

/**
 * Shared Schemas
 */
const sharedSchemas = {
  findAll: {
    query: Joi.object({
      page: Joi.number().integer().min(1).default(1),
      per_page: Joi.number().integer().min(1).max(100).default(10),
      category: Joi.string().optional(),
      in_stock: Joi.boolean().optional(),
    }),
  },

  findOne: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

/**
 * Product Schemas
 */
const createProduct = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional().allow(null),
    price: Joi.number().positive().optional().allow(null),
    category: Joi.string().required(),
    in_stock: Joi.boolean().required(),
  }),
};

const updateProduct = {
  params: sharedSchemas.findOne.params,
  body: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional().allow(null),
    price: Joi.number().positive().optional().allow(null),
    category: Joi.string().optional(),
    in_stock: Joi.boolean().optional(),
  }),
};

/**
 * Review Schemas
 */
const createReview = {
  body: Joi.object({
    product_id: Joi.number().integer().required(),
    content: Joi.string().optional().allow(null),
    rating: Joi.number().integer().min(1).max(5).required(),
  }),
};

const updateReview = {
  params: sharedSchemas.findOne.params,
  body: Joi.object({
    content: Joi.string().optional().allow(null),
    rating: Joi.number().integer().min(1).max(5).optional(),
    status: Joi.string()
      .valid(...Object.values(ReviewStatus))
      .optional(),
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
