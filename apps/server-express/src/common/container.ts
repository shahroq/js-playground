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
import { UserRepository } from "@/features/v1/users/repository";
import { UserService } from "@/features/v1/users/service";
import { UserController } from "@/features/v1/users/controller";
export * from "@/features/v1/users/dto/create.dto";
export * from "@/features/v1/users/dto/update.dto";
export * from "@/features/v1/users/dto/user.dto";
// routes: accounts
import { AccountService } from "@/features/v1/accounts/service";
import { AccountController } from "@/features/v1/accounts/controller";
// routes: products
import { ProductRepository } from "@/features/v1/products/repository";
import { ProductService } from "@/features/v1/products/service";
import { ProductController } from "@/features/v1/products/controller";
export * from "@/features/v1/products/dto/create.dto";
export * from "@/features/v1/products/dto/update.dto";
export * from "@/features/v1/products/dto/product.dto";
// routes: reviews
import { ReviewRepository } from "@/features/v1/reviews/repository";
import { ReviewService } from "@/features/v1/reviews/service";
import { ReviewController } from "@/features/v1/reviews/controller";
export * from "@/features/v1/reviews/dto/create.dto";
export * from "@/features/v1/reviews/dto/update.dto";
export * from "@/features/v1/reviews/dto/review.dto";
// routes: posts
import { PostService } from "@/features/v1/posts/service";
import { PostController } from "@/features/v1/posts/controller";
export * from "@/features/v1/posts/dto/post-dto";
// routes: httpbin
import { HttpbinService } from "@/features/v1/httpbin/service";
import { HttpbinController } from "@/features/v1/httpbin/controller";

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
