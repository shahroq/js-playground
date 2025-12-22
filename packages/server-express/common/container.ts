// common
import config from "./config";
import { getEnvelope } from "./envelope/factory";
import { getValidatorHandler } from "./validation/factory";
import { createDbClient } from "./db-client/factory";
import { createHttpClient } from "./http-client/factory";
import { createMailer } from "./mailer/factory";
import { createLogger } from "./logger/factory";

// routes
import { ProductRepository } from "@products/repository";
import { ProductService } from "@products/service";
import { ProductController } from "@products/controller";
export * from "@products/dto";

import { ReviewRepository } from "@reviews/repository";
import { ReviewService } from "@reviews/service";
import { ReviewController } from "@reviews/controller";
export * from "@reviews/dto";

import { PostService } from "@posts/service";
import { PostController } from "@posts/controller";
export * from "@posts/dto";

import { ObjectService } from "@/routes/v1/objects/service";
import { ObjectController } from "@/routes/v1/objects/controller";

// re-exports
export * as utils from "./utils/utils";
export { default as AppError, isAppError } from "./error/app-error";
export * from "@/common/pagination/pagination-summary.dto";
export * from "@/common/error/global-error.middleware";
export * from "@/common/middlewares/undefined-routes.middleware";
export * from "@/common/envelope/attach-system-data.middleware";
export * from "@/common/envelope/wrap-response.middleware";
export * from "@/common/query/normalize-query.middleware";
export * from "@/common/query/app-query";
export { queryOptions as defaultQueryOptions } from "@/common/query/default.options";
export { queryOptions as productsQueryOptions } from "@/routes/v1/products/query.options";
export { queryOptions as reviewsQueryOptions } from "@/routes/v1/reviews/query.options";

/**
 *  Composition Root & Barrel Export
 */

// 0. Common Services
export * from "@/common/i118n/t";
export const Envelope = getEnvelope();
export const validate = getValidatorHandler();
export const dbAdapter = createDbClient();
export const httpClientJsonPlaceHolder = createHttpClient(
  config.http_client.api_url_jsonplaceholder as string
);
export const httpClientRestfulapi = createHttpClient(
  config.http_client.api_url_restfulapi as string
);
export const mailer = createMailer();
export const logger = createLogger();

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
