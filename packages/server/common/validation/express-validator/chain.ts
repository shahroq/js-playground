import { body, param, query } from "express-validator";

/**
 * Shared Validation Chains
 */
const sharedChains = {
  getItems: [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be at least 1"),
    query("per_page")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Limit must be between 1 and 100"),
    query("category").optional().isString(),
    query("in_stock").optional().isBoolean(),
  ],

  getItem: [param("id").isInt().withMessage("ID must be an integer")],
};

/**
 * Product Validation Chains
 */
const createProduct = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("description").optional().isString(),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be positive"),
  body("category").isString().notEmpty().withMessage("Category is required"),
  body("in_stock").isBoolean().withMessage("in_stock must be a boolean"),
];

const updateProduct = [
  ...sharedChains.getItem,
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be positive"),
  body("category").optional().isString(),
  body("in_stock").optional().isBoolean(),
];

/**
 * Review Validation Chains
 */
const createReview = [
  body("product_id").isInt().withMessage("product_id must be an integer"),
  body("content").optional().isString(),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
];

const updateReview = [
  ...sharedChains.getItem,
  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("content").optional().isString(),
];

/**
 * Export Combined Chains
 */
export const chains = {
  products: {
    ...sharedChains,
    createItem: createProduct,
    updateItem: updateProduct,
    deleteItem: sharedChains.getItem,
  },
  reviews: {
    ...sharedChains,
    createItem: createReview,
    updateItem: updateReview,
    deleteItem: sharedChains.getItem,
  },
};
