import config from "./config";

import { getAppResponse } from "./app-response/factory";
import { getValidatorMiddleware } from "./validation/factory";
import { getDBAdapter } from "./db-adapter/factory";
import { getHttpClient } from "./http-client/factory";

import { ProductRepository } from "@products/repository";
import { ProductService } from "@products/service";
import { ProductController } from "@products/controller";

import { ReviewRepository } from "@reviews/repository";
import { ReviewService } from "@reviews/service";
import { ReviewController } from "@reviews/controller";

import { PostController } from "@posts/controller";
import { PostService } from "@posts/service";

/**
 *  Composition Root
 */

// 0. Common Services
const appResponse = getAppResponse();
const validate = getValidatorMiddleware();
const dbAdapter = getDBAdapter();
const httpClient = getHttpClient(config.api_url_jsonplaceholder as string);

// 1. Repositories
const productRepository = new ProductRepository(dbAdapter);
const reviewRepository = new ReviewRepository(dbAdapter);

// 2. Services:
const productService = new ProductService(productRepository, reviewRepository);
const reviewService = new ReviewService(reviewRepository, productRepository);
const postService = new PostService(httpClient);

// 3. Controllers:
const productController = new ProductController(productService);
const reviewController = new ReviewController(reviewService);
const postController = new PostController(postService);

// Export all dependencies as a single container object
export {
  appResponse,
  validate,
  dbAdapter,
  productRepository,
  productService,
  productController,
  reviewRepository,
  reviewService,
  reviewController,
  postService,
  postController,
};
