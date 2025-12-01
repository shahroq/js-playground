import express, { Router } from "express";
import products from "./products";
import reviews from "./reviews";
// import users from "./users";
import posts from "./posts";
import objects from "./objects";

const v1Router: Router = express.Router();

v1Router.use("/products", products);
v1Router.use("/reviews", reviews);
// v1Router.use("/users", users);
v1Router.use("/posts", posts);
v1Router.use("/objects", objects);

export default v1Router;
