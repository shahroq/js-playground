// common
import config from "./config";
import { getAppEnvelope } from "./app-envelope/factory";
import { getValidatorMiddleware } from "./validation/factory";
import { getDBAdapter } from "./db-adapter/factory";
import { getHttpClient } from "./http-client/factory";

// routes
import { ProductRepository } from "@products/repository";
import { ProductService } from "@products/service";
import { ProductController } from "@products/controller";

import { ReviewRepository } from "@reviews/repository";
import { ReviewService } from "@reviews/service";
import { ReviewController } from "@reviews/controller";

import { PostService } from "@posts/service";
import { PostController } from "@posts/controller";

import { ObjectService } from "@/routes/v1/objects/service";
import { ObjectController } from "@/routes/v1/objects/controller";

// re-exports
export * as utils from "./utils/utils";
export { default as AppError } from "./app-error/app-error";
export * from "@/common/meta-data/meta-data";
export * from "./app-error/global-error.middleware";
export * from "./undefined-routes/undefined-routes.middleware";
export * from "./app-envelope/append-system-info.middleware";
export * from "@/common/query-object/normalize-query.middleware";

/**
 *  Composition Root & Barrel Export
 */

// 0. Common Services
export const appEnvelope = getAppEnvelope();
export const validate = getValidatorMiddleware();
export const dbAdapter = getDBAdapter();
export const httpClientJsonPlaceHolder = getHttpClient(
  config.api_url_jsonplaceholder as string
);
export const httpClientRestfulapi = getHttpClient(
  config.api_url_restfulapi as string
);

// 1. Repositories
export const productRepository = new ProductRepository(dbAdapter);
export const reviewRepository = new ReviewRepository(dbAdapter);

// 2. Services:
export const productService = new ProductService(
  productRepository,
  reviewRepository
);
export const reviewService = new ReviewService(
  reviewRepository,
  productRepository
);
export const postService = new PostService(httpClientJsonPlaceHolder);
export const objectService = new ObjectService(httpClientRestfulapi);

// 3. Controllers:
export const productController = new ProductController(productService);
export const reviewController = new ReviewController(reviewService);
export const postController = new PostController(postService);
export const objectController = new ObjectController(objectService);

// Export all dependencies as a single container object
export { config };
