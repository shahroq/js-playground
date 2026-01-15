import express, { Router } from "express";
import root from "./root";
import account from "./accounts";
import users from "./users";
import products from "./products";
import reviews from "./reviews";
import posts from "./posts";
import httpbin from "./httpbin";

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
