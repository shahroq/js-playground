/**
 * Common
 *  Composition Root & Barrel Export/ re-exports
 */
import config from "./config";
export { config };
export * from "@/common/i118n/t";
export * as utils from "@/common/utils/utils";
export * from "@/common/error/app-error";
export * from "@/common/dto/pagination-summary.dto";
export * from "@/common/error/global-error.middleware";
export * from "@/common/middlewares/undefined-routes.middleware";
export * from "@/common/middlewares/coerce-id.middleware";
export * from "@/common/envelope/attach-system-data.middleware";
export * from "@/common/middlewares/wrap-response.middleware";
export * from "@/common/query-object/query-parser";
export * from "@/common/query-object/default.policy";
export * from "@/common/auth/auth.middleware";
export * from "@/common/validation/validate.middleware";

// Common Services
import { dbCientService } from "@/common/db-client";
export * from "@/common/db-client";
import { httpClientService } from "@/common/http-client";
export * from "@/common/http-client";
import { llmClientService } from "@/common/llm-client";
export * from "@/common/llm-client";
export * from "@/common/validation";
export * from "@/common/envelope";
export * from "@/common/logger";
export * from "@/common/mailer";
export * from "@/common/hashing";
export * from "@/common/auth";

// routes: users
import { UserRepository } from "@users/repository";
import { UserService } from "@users/service";
import { UserController } from "@users/controller";
export * from "@users/dto/create.dto";
export * from "@users/dto/update.dto";
export * from "@users/dto/user.dto";
// routes: accounts
import { AccountService } from "@accounts/service";
import { AccountController } from "@accounts/controller";
// routes: products
import { ProductRepository } from "@products/repository";
import { ProductService } from "@products/service";
import { ProductController } from "@products/controller";
export * from "@products/dto/create.dto";
export * from "@products/dto/update.dto";
export * from "@products/dto/product.dto";
// routes: reviews
import { ReviewRepository } from "@reviews/repository";
import { ReviewService } from "@reviews/service";
import { ReviewController } from "@reviews/controller";
export * from "@reviews/dto/create.dto";
export * from "@reviews/dto/update.dto";
export * from "@reviews/dto/review.dto";
// routes: posts
import { PostService } from "@posts/service";
import { PostController } from "@posts/controller";
export * from "@posts/dto/post-dto";
// routes: httpbin
import { HttpbinService } from "@httpbin/service";
import { HttpbinController } from "@httpbin/controller";

// 1. Repositories
export const userRepository = new UserRepository(dbCientService);
export const productRepository = new ProductRepository(dbCientService);
export const reviewRepository = new ReviewRepository(dbCientService);

// 2. Services:
export const userService = new UserService(userRepository);
export const accountService = new AccountService(userRepository, userService);
export const productService = new ProductService(
  productRepository,
  reviewRepository,
  llmClientService
);
export const reviewService = new ReviewService(
  reviewRepository,
  productRepository
);
export const postService = new PostService(httpClientService);
export const httpbinService = new HttpbinService(httpClientService);

// 3. Controllers:
export const userController = new UserController(userService);
export const accountController = new AccountController(accountService);
export const productController = new ProductController(productService);
export const reviewController = new ReviewController(reviewService);
export const postController = new PostController(postService);
export const httpbinController = new HttpbinController(httpbinService);
