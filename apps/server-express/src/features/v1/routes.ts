import express, { Router } from "express";
import root from "./root/routes";
import account from "./accounts/routes";
import users from "./users/routes";
import products from "./products/routes";
import reviews from "./reviews/routes";
import posts from "./posts/routes";
import httpbin from "./httpbin/routes";

const appRouter: Router = express.Router();

appRouter.use("/", root);
appRouter.use("/", account);
// TODO: factor /api/v1 in
appRouter.use("/api/v1/users", users);
appRouter.use("/api/v1/products", products);
appRouter.use("/api/v1/reviews", reviews);
appRouter.use("/api/v1/posts", posts);
appRouter.use("/api/v1/httpbin", httpbin);

export default appRouter;
