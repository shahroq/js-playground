import config from "./config";
import * as utils from "./utils/utils";
import { globalErrorHandler } from "./app-error/global-error-handler.middleware";
import { undefinedRoutesHandler } from "./undefined-routes/undefined-routes-handler.middleware";
import { normalizeQueryHandler } from "@/common/query-object/normalize-query.middleware";
import AppError from "./app-error/app-error";
import { getAppEnvelope } from "./app-envelope/factory";
import { getValidatorMiddleware } from "./validation/factory";
import { MetaData } from "@/common/meta-data/meta-data";
import { getDBAdapter } from "./db-adapter/factory";
import { getHttpClient } from "./http-client/factory";

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

/**
 *  Composition Root & Barrel Export
 */

// 0. Common Services
const appEnvelope = getAppEnvelope();
const validate = getValidatorMiddleware();
const dbAdapter = getDBAdapter();
const httpClientJsonPlaceHolder = getHttpClient(
  config.api_url_jsonplaceholder as string
);
const httpClientRestfulapi = getHttpClient(config.api_url_restfulapi as string);

// 1. Repositories
const productRepository = new ProductRepository(dbAdapter);
const reviewRepository = new ReviewRepository(dbAdapter);

// 2. Services:
const productService = new ProductService(productRepository, reviewRepository);
const reviewService = new ReviewService(reviewRepository, productRepository);
const postService = new PostService(httpClientJsonPlaceHolder);
const objectService = new ObjectService(httpClientRestfulapi);

// 3. Controllers:
const productController = new ProductController(productService);
const reviewController = new ReviewController(reviewService);
const postController = new PostController(postService);
const objectController = new ObjectController(objectService);

// Export all dependencies as a single container object
export {
  config,
  utils,
  undefinedRoutesHandler,
  globalErrorHandler,
  normalizeQueryHandler,
  AppError,
  appEnvelope,
  validate,
  MetaData,
  dbAdapter,
  httpClientJsonPlaceHolder,
  httpClientRestfulapi,
  productRepository,
  productService,
  productController,
  reviewRepository,
  reviewService,
  reviewController,
  postService,
  postController,
  objectService,
  objectController,
};
