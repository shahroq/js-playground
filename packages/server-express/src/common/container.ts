// common
import config from "./config";
import { envelopeAdapterFactory } from "./envelope/factory";
import { validatorHandlerFactory } from "./validation/factory";
import { DbClientAdapterFactory } from "./db-client/factory";
import { createHttpClient } from "./http-client/factory";
import { mailerAdapterFactory } from "./mailer/factory";
import { loggerAdapterFactory } from "./logger/factory";

// routes
import { ProductRepository } from "@products/repository";
import { ProductService } from "@products/service";
import { ProductController } from "@products/controller";
export * from "@products/dto/create-product.dto";
export * from "@products/dto/update-product.dto";
export * from "@products/dto/product.dto";

import { ReviewRepository } from "@reviews/repository";
import { ReviewService } from "@reviews/service";
import { ReviewController } from "@reviews/controller";
export * from "@reviews/dto/create-review.dto";
export * from "@reviews/dto/update-review.dto";
export * from "@reviews/dto/review.dto";

import { PostService } from "@posts/service";
import { PostController } from "@posts/controller";
export * from "@posts/dto/post-dto";

import { ObjectService } from "@/routes/v1/objects/service";
import { ObjectController } from "@/routes/v1/objects/controller";

// re-exports
export * as utils from "./utils/utils";
export * from "./error/app-error";
export * from "@/common/dto/pagination-summary.dto";
export * from "@/common/error/global-error.middleware";
export * from "@/common/middlewares/undefined-routes.middleware";
export * from "@/common/envelope/attach-system-data.middleware";
export * from "@/common/envelope/wrap-response.middleware";
export * from "@/common/query/normalize-query.middleware";
export * from "@/common/query/app-query";
export { queryPolicy as defaultQueryPolicy } from "@/common/query/default.policy";
export { queryPolicy as productsQueryPolicy } from "@/routes/v1/products/query.policy";
export { queryPolicy as reviewsQueryPolicy } from "@/routes/v1/reviews/query.policy";

/**
 *  Composition Root & Barrel Export
 */

// 0. Common Services
export * from "@/common/i118n/t";
export const Envelope = envelopeAdapterFactory(config.envelope.strategy);
export const validate = validatorHandlerFactory(config.validation.strategy);
export const dbAdapter = DbClientAdapterFactory(
  config.database.client_strategy
);
export const httpClientJsonPlaceHolder = createHttpClient(
  config.http_client.strategy,
  config.http_client.api_url_jsonplaceholder
);
export const httpClientRestfulapi = createHttpClient(
  config.http_client.strategy,
  config.http_client.api_url_restfulapi
);
export const mailer = mailerAdapterFactory(config.mailer.strategy || "jsend");
export const logger = loggerAdapterFactory(
  config.logger.strategy || "console-log"
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
