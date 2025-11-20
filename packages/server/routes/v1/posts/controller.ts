import type { NextFunction, Request, Response } from "express";
import { formatter } from "@/common/response/factory";
import type { Post } from "./type";
import { PostService } from "./service";
import AppError from "@/common/error/app-error";

const collection = "post";

// get repository
const service = new PostService();

export const postController = {
  async index(
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const items: Post[] = await service.getItems();
    res.status(200).json(formatter.format(null, { [`${collection}s`]: items }));
  },

  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const item = await service.getItem(+id);
    if (!item) return next(AppError.notFound());

    res.status(200).json(formatter.format(null, { [collection]: item }));
  },
};
