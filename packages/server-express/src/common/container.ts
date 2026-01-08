// common
import config from "./config";
export * from "@/common/i118n/t";

// routes
import { UserRepository } from "@users/repository";
import { UserService } from "@users/service";
import { AccountService } from "@users/account.service";
import { UserController } from "@users/controller";
export * from "@users/dto/create.dto";
export * from "@users/dto/update.dto";
export * from "@users/dto/user.dto";

import { ProductRepository } from "@products/repository";
import { ProductService } from "@products/service";
import { ProductController } from "@products/controller";
export * from "@products/dto/create.dto";
export * from "@products/dto/update.dto";
export * from "@products/dto/product.dto";

import { ReviewRepository } from "@reviews/repository";
import { ReviewService } from "@reviews/service";
import { ReviewController } from "@reviews/controller";
export * from "@reviews/dto/create.dto";
export * from "@reviews/dto/update.dto";
export * from "@reviews/dto/review.dto";

import { PostService } from "@posts/service";
import { PostController } from "@posts/controller";
export * from "@posts/dto/post-dto";

import { HttpbinService } from "@httpbin/service";
import { HttpbinController } from "@httpbin/controller";
import { httpClientService } from "./container";
import { dbCientService } from "@/common/db-client/index";

// re-exports
export * as utils from "./utils/utils";
export * from "./error/app-error";
export * from "@/common/dto/pagination-summary.dto";
export * from "@/common/error/global-error.middleware";
export * from "@/common/middlewares/undefined-routes.middleware";
export * from "@/common/middlewares/coerce-id.middleware";
export * from "@/common/envelope/attach-system-data.middleware";
export * from "@/common/envelope/wrap-response.middleware";
export * from "@/common/query-object/normalize-query-string";
export * from "@/common/query-object/default.policy";
export * from "@/common/auth/auth.middleware";

/**
 *  Composition Root & Barrel Export
 */

// 0. Common Services
export * from "@/common/validation";
export * from "@/common/db-client";
export * from "@/common/http-client";
export * from "@/common/logger";
export * from "@/common/mailer";
export * from "@/common/envelope";
export * from "@/common/hashing";
export * from "@/common/auth";

// 1. Repositories
export const userRepository = new UserRepository(dbCientService);
export const productRepository = new ProductRepository(dbCientService);
export const reviewRepository = new ReviewRepository(dbCientService);

// 2. Services:
export const userService = new UserService(userRepository);
export const accountService = new AccountService(userRepository, userService);
export const productService = new ProductService(
  productRepository,
  reviewRepository
);
export const reviewService = new ReviewService(
  reviewRepository,
  productRepository
);
export const postService = new PostService(httpClientService);
export const httpbinService = new HttpbinService(httpClientService);

// 3. Controllers:
export const userController = new UserController(userService, accountService);
export const productController = new ProductController(productService);
export const reviewController = new ReviewController(reviewService);
export const postController = new PostController(postService);
export const httpbinController = new HttpbinController(httpbinService);

// Export all dependencies as a single container object
export { config };
