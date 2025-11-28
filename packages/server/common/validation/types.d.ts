import type { Request, Response, NextFunction } from "express";

export type ValidationStrategy = "express-validator" | "joi" | "zod";

// it's not splitable! why? when make a union of two type with, each with multiple items, it's not working. works just when each type has one value!
export type ValidationAction =
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
  action: ValidationAction
) => (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

/*
export interface IValidatorMiddleware {
  validate(
    action: Action
  ): (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
}
*/
