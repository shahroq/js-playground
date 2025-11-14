import express, { Router } from "express";
import products from "./products";
import reviews from "./reviews";
import users from "./users";

const v1Router: Router = express.Router();

v1Router.use("/products", products);
v1Router.use("/reviews", reviews);
// v1Router.use("/users", users);

export default v1Router;
