import type { Request, Response } from "express";
import { PostService } from "./service";

export class PostController {
  private collection = "post";

  constructor(private readonly service: PostService) {}

  index = async (_: any, res: Response) => {
    const items = await this.service.getItems();

    res.status(200).json({ [`${this.collection}s`]: items });
  };

  show = async (req: Request, res: Response) => {
    const item = await this.service.getItem(req.params.id);

    res.status(200).json({ [this.collection]: item });
  };
}
