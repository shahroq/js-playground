import type { NextFunction, Request, Response } from "express";
import AppError from "@/core/app-error";
import { formatter } from "@/core/response";
import { reviewService as service } from "./service";

const collection = "review";

export const reviewController = {
  async getItems(req: Request, res: Response, next: NextFunction) {
    const items = await service.getItems();

    res.status(200).json(formatter.success({ [`${collection}s`]: items }));
  },

  async getItem(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const item = await service.getItem(Number(id));

    res.status(200).json(formatter.success({ [collection]: item }));
  },

  async createItem(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    const newItem = await service.createItem(body);

    res.status(201).json(formatter.success({ [collection]: newItem }));
  },

  async updateItem(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const { body } = req;

    const updatedItem = await service.updateItem(Number(id), body);
    if (!updatedItem) return next(AppError.notFound());

    res.status(200).json(formatter.success({ [collection]: updatedItem }));
  },

  async deleteItem(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const deleted = await service.deleteItem(Number(id));
    if (!deleted) return next(AppError.notFound());

    res
      .status(200)
      .json(formatter.success({ message: `${collection} deleted.` }));
  },
};
