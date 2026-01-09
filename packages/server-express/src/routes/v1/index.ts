import express, { Router } from "express";

import root from "./root";
import users from "./users";
import products from "./products";
import reviews from "./reviews";
import posts from "./posts";
import httpbin from "./httpbin";

const v1Router: Router = express.Router();

v1Router.use("/", root);
// TODO: factor /api/v1 in
v1Router.use("/api/v1/users", users);
v1Router.use("/api/v1/products", products);
v1Router.use("/api/v1/reviews", reviews);
v1Router.use("/api/v1/posts", posts);
v1Router.use("/api/v1/httpbin", httpbin);

export default v1Router;
