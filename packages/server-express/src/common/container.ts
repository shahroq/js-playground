// common
import config from "./config";
import { envelopeAdapterFactory } from "./envelope/factory";
import { validatorHandlerFactory } from "./validation/factory";
import { DbClientAdapterFactory } from "./db-client/factory";
import { createHttpClient } from "./http-client/factory";
import { mailerAdapterFactory } from "./mailer/factory";
import { loggerAdapterFactory } from "./logger/factory";

// routes
import { UserRepository } from "@users/repository";
import { UserService } from "@users/service";
import { AuthService } from "@users/auth.service";
import { UserController } from "@users/controller";
export * from "@users/dto/create.dto";
export * from "@users/dto/update.dto";
export * from "@users/dto/user.dto";

import { ProductRepository } from "@products/repository";
import { ProductService } from "@products/service";
import { ProductController } from "@products/controller";
export * from "@/routes/v1/products/dto/create.dto";
export * from "@/routes/v1/products/dto/update.dto";
export * from "@products/dto/product.dto";

import { ReviewRepository } from "@reviews/repository";
import { ReviewService } from "@reviews/service";
import { ReviewController } from "@reviews/controller";
export * from "@/routes/v1/reviews/dto/create.dto";
export * from "@/routes/v1/reviews/dto/update.dto";
export * from "@reviews/dto/review.dto";

import { PostService } from "@posts/service";
import { PostController } from "@posts/controller";
export * from "@posts/dto/post-dto";

import { HttpbinService } from "@httpbin/service";
import { HttpbinController } from "@httpbin/controller";

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
export { queryPolicy as defaultQueryPolicy } from "@/common/query/default.query-policy";
export { queryPolicy as usersQueryPolicy } from "@users/query-policy";
export { queryPolicy as productsQueryPolicy } from "@products/query-policy";
export { queryPolicy as reviewsQueryPolicy } from "@reviews/query-policy";

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
export const httpClient = createHttpClient(config.http_client.strategy);
export const mailer = mailerAdapterFactory(config.mailer.strategy || "jsend");
export const logger = loggerAdapterFactory(
  config.logger.strategy || "console-log"
);

// 1. Repositories
export const userRepository = new UserRepository(dbAdapter);
export const productRepository = new ProductRepository(dbAdapter);
export const reviewRepository = new ReviewRepository(dbAdapter);

// 2. Services:
export const userService = new UserService(userRepository);
export const authService = new AuthService(userRepository, userService);
export const productService = new ProductService(
  productRepository,
  reviewRepository
);
export const reviewService = new ReviewService(
  reviewRepository,
  productRepository
);
export const postService = new PostService(httpClient);
export const httpbinService = new HttpbinService(httpClient);

// 3. Controllers:
export const userController = new UserController(userService, authService);
export const productController = new ProductController(productService);
export const reviewController = new ReviewController(reviewService);
export const postController = new PostController(postService);
export const httpbinController = new HttpbinController(httpbinService);

// Export all dependencies as a single container object
export { config };
