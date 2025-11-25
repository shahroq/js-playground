import type { NextFunction, Request, Response } from "express";
import AppError from "@/common/error/app-error";
import { formatter } from "@/common/response/factory";
import { productService as service } from "./service";

const collection = "product";

export const productController = {
  async index(req: Request, res: Response, next: NextFunction) {
    const { items, meta } = await service.getItems(req.query);

    res
      .status(200)
      .json(formatter.format(null, { [`${collection}s`]: items, meta }));
  },

  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const { item } = await service.getItem(+id);
    if (!item) return next(AppError.notFound());

    res.status(200).json(formatter.format(null, { [collection]: item }));
  },

  async store(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    const { item: newItem } = await service.createItem(body);

    res.status(201).json(formatter.format(null, { [collection]: newItem }));
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const { body } = req;

    const { item: updatedItem } = await service.updateItem(+id, body);
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

  async showWithReviews(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const { item, reviews, review_count, average_rating } =
      await service.getItemWithReviews(+id);
    if (!item) return next(AppError.notFound());

    res.status(200).json(
      formatter.format(null, {
        [collection]: item,
        reviews,
        review_count,
        average_rating,
      })
    );
  },
};
