import type { NextFunction, Request, Response } from "express";
import AppError from "@/common/app-error";
import { formatter } from "@/common/response";
import { productService as service } from "./service";

const collection = "product";

export const productController = {
  async getItems(_req: Request, res: Response, next: NextFunction) {
    const items = await service.getItems();

    res.status(200).json(formatter.format(null, { [`${collection}s`]: items }));
  },

  async getItem(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const item = await service.getItem(+id);
    if (!item) return next(AppError.notFound());

    res.status(200).json(formatter.format(null, { [collection]: item }));
  },

  async createItem(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    const newItem = await service.createItem(body);

    res.status(201).json(formatter.format(null, { [collection]: newItem }));
  },

  async updateItem(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const { body } = req;

    const updatedItem = await service.updateItem(Number(id), body);
    if (!updatedItem) return next(AppError.notFound());

    res.status(200).json(formatter.format(null, { [collection]: updatedItem }));
  },

  async deleteItem(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const deleted = await service.deleteItem(+id);
    if (!deleted) return next(AppError.notFound());

    res
      .status(200)
      .json(formatter.format(null, { message: `${collection} deleted.` }));
  },
};
