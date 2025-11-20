import type { NextFunction, Request, Response } from "express";
import AppError from "@/common/app-error";
import { formatter } from "@/common/response/factory";
import { reviewService as service } from "./service";

const collection = "review";

export const reviewController = {
  async index(_req: Request, res: Response, next: NextFunction) {
    const items = await service.getItems();

    res.status(200).json(formatter.format(null, { [`${collection}s`]: items }));
  },

  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const item = await service.getItem(+id);
    if (!item) return next(AppError.notFound());

    res.status(200).json(formatter.format(null, { [collection]: item }));
  },

  async store(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    const newItem = await service.createItem(body);

    res.status(201).json(formatter.format(null, { [collection]: newItem }));
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const { body } = req;

    const updatedItem = await service.updateItem(+id, body);
    if (!updatedItem) return next(AppError.notFound());

    res.status(200).json(formatter.format(null, { [collection]: updatedItem }));
  },

  async destroy(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const deleted = await service.deleteItem(+id);
    if (!deleted) return next(AppError.notFound());

    res
      .status(200)
      .json(formatter.format(null, { message: `${collection} deleted.` }));
  },
};
