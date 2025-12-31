import Joi from "joi";
import { UserRole } from "@users/types";
import { ReviewStatus } from "@reviews/types";

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
 * User Schemas
 */
const createUser = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(128).required(),
    role: Joi.string()
      .valid(...Object.values(UserRole))
      .required(),
  }),
};

const updateUser = {
  params: sharedSchemas.findOne.params, // assuming this is already Joi
  body: Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(5).max(128).optional(),
    role: Joi.string()
      .valid(...Object.values(UserRole))
      .optional(),
  }),
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
  users: {
    ...sharedSchemas,
    create: createUser,
    update: updateUser,
    delete: sharedSchemas.findOne,
  },
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
