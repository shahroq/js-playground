import type { Request, Response, NextFunction } from "express";

export type ValidationStrategy = "express-validator" | "joi" | "zod";

export type Action =
  | "users.getItems"
  | "users.getItem"
  | "users.createItem"
  | "users.updateItem"
  | "users.deleteItem"
  | "products.getItems"
  | "products.getItem"
  | "products.createItem"
  | "products.updateItem"
  | "products.deleteItem"
  | "reviews.getItems"
  | "reviews.getItem"
  | "reviews.createItem"
  | "reviews.updateItem"
  | "reviews.deleteItem";
/*
export interface ValidationSchema/Payload {
  body?: any;
  query?: any;
  params?: any;
}
*/

export type ValidatorMiddleware = (
  action: Action
) => (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

/*
export interface IValidatorMiddleware {
  validate(
    action: Action
  ): (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
}
*/
