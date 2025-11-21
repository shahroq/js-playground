import Joi from "joi";

/**
 * Shared Schemas
 */
const sharedSchemas = {
  getItems: {
    query: Joi.object({
      page: Joi.number().integer().min(1).default(1),
      per_page: Joi.number().integer().min(1).max(100).default(10),
      category: Joi.string().optional(),
      in_stock: Joi.boolean().optional(),
    }),
  },

  getItem: {
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
  params: sharedSchemas.getItem.params,
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
    rating: Joi.number().min(1).max(5).required(),
  }),
};

const updateReview = {
  params: sharedSchemas.getItem.params,
  body: Joi.object({
    rating: Joi.number().min(1).max(5).optional(),
    content: Joi.string().optional().allow(null),
  }),
};

/**
 * Export combined schemas
 */
export const schemas = {
  products: {
    ...sharedSchemas,
    createItem: createProduct,
    updateItem: updateProduct,
    deleteItem: sharedSchemas.getItem,
  },
  reviews: {
    ...sharedSchemas,
    createItem: createReview,
    updateItem: updateReview,
    deleteItem: sharedSchemas.getItem,
  },
};
