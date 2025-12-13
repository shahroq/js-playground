import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/common/container";
import type { Post } from "./types";
import { PostService } from "./service";

export class PostController {
  private collection = "post";

  constructor(private readonly service: PostService) {}

  index = async (_: any, res: Response) => {
    const items: Post[] = await this.service.findAll();

    res.status(200).json({ [`${this.collection}s`]: items });
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const item = await this.service.find(+id);
    if (!item) return next(AppError.notFound());

    res.status(200).json({ [this.collection]: item });
  };
}
