import type { NextFunction, Request, Response } from "express";
import AppError from "@/common/app-error/app-error";
import { appResponse } from "@/common/app-response/factory";
import { productService as service } from "./service";

const collection = "product";

export const productController = {
  async index(req: Request, res: Response) {
    const { items, meta } = await service.getItems(req.query);

    res
      .status(200)
      .json(appResponse.format(null, { [`${collection}s`]: items, meta }));
  },

  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const { item } = await service.getItem(+id, req.query);
    if (!item) return next(AppError.notFound());

    res.status(200).json(appResponse.format(null, { [collection]: item }));
  },

  async store(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    const { item: newItem } = await service.createItem(body);

    res.status(201).json(appResponse.format(null, { [collection]: newItem }));
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const { body } = req;

    const { item: updatedItem } = await service.updateItem(+id, body);
    if (!updatedItem) return next(AppError.notFound());

    res
      .status(200)
      .json(appResponse.format(null, { [collection]: updatedItem }));
  },

  async destroy(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const deleted = await service.deleteItem(+id);
    if (!deleted) return next(AppError.notFound());

    res
      .status(200)
      .json(appResponse.format(null, { message: `${collection} deleted.` }));
  },
};
