import type { NextFunction, Request, Response } from "express";
import { appEnvelope, AppError } from "@/common/container";
import type { Post } from "./types";
import { PostService } from "./service";

export class PostController {
  private collection = "post";

  constructor(private service: PostService) {}

  async index(
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const items: Post[] = await this.service.getItems();
    res
      .status(200)
      .json(appEnvelope.create(null, { [`${this.collection}s`]: items }));
  }

  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const item = await this.service.getItem(+id);
    if (!item) return next(AppError.notFound());

    res.status(200).json(appEnvelope.create(null, { [this.collection]: item }));
  }
}
