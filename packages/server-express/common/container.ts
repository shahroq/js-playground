// common
import config from "./config";
import { getAppEnvelope } from "./app-envelope/factory";
import { getValidatorHandler } from "./validation/factory";
import { getDBAdapter } from "./db-adapter/factory";
import { getHttpClient } from "./http-client/factory";
import { getMailer } from "./mailer/factory";
import { getLogger } from "./logger/factory";

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
export { default as AppError, isAppError } from "./app-error/app-error";
export * from "@/common/pagination/pagination-summary.dto";
export * from "@/common/app-error/global-error.middleware";
export * from "@/common/middlewares/undefined-routes.middleware";
export * from "@/common/app-envelope/attach-system-data.middleware";
export * from "@/common/app-envelope/envelop-response.middleware";
export * from "@/common/app-query/normalize-query.middleware";
export * from "@/common/app-query/app-query";
export { queryOptions as defaultQueryOptions } from "@/common/app-query/default.options";
export { queryOptions as productsQueryOptions } from "@/routes/v1/products/query.options";
export { queryOptions as reviewsQueryOptions } from "@/routes/v1/reviews/query.options";

/**
 *  Composition Root & Barrel Export
 */

// 0. Common Services
export const appEnvelope = getAppEnvelope();
export const validate = getValidatorHandler();
export const dbAdapter = getDBAdapter();
export const httpClientJsonPlaceHolder = getHttpClient(
  config.http_client.api_url_jsonplaceholder as string
);
export const httpClientRestfulapi = getHttpClient(
  config.http_client.api_url_restfulapi as string
);
export const mailer = getMailer();
export const logger = getLogger();

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
