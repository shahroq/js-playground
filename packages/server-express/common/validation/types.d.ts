import type { Request, Response, NextFunction } from "express";

export type ValidationStrategy = "express-validator" | "joi" | "zod";

// it's not splitable! why? when make a union of two type with, each with multiple items, it's not working. works just when each type has one value!
export type ValidationAction =
  | "users.findAll"
  | "users.findOne"
  | "users.create"
  | "users.update"
  | "users.delete"
  | "products.findAll"
  | "products.findOne"
  | "products.create"
  | "products.update"
  | "products.delete"
  | "reviews.findAll"
  | "reviews.findOne"
  | "reviews.create"
  | "reviews.update"
  | "reviews.delete";
/*
export interface ValidationSchema/Payload {
  body?: any;
  query?: any;
  params?: any;
}
*/

export type ValidatorHandler = (
  action: ValidationAction
) => (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

/*
export interface IValidatorMiddleware {
  validate(
    action: Action
  ): (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
}
*/
