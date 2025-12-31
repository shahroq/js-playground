import express, { Router } from "express";
import users from "./users";
import products from "./products";
import reviews from "./reviews";
import posts from "./posts";
import httpbin from "./httpbin";

const v1Router: Router = express.Router();

v1Router.use("/products", products);
v1Router.use("/reviews", reviews);
v1Router.use("/users", users);
v1Router.use("/posts", posts);
v1Router.use("/httpbin", httpbin);

export default v1Router;
