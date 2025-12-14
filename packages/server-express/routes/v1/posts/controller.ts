import type { Request, Response } from "express";
import type { Post } from "./types";
import { PostService } from "./service";
import type { EntityId } from "@/common/types";

export class PostController {
  private collection = "post";

  constructor(private readonly service: PostService) {}

  index = async (_: any, res: Response) => {
    const items: Post[] = await this.service.getItems();

    res.status(200).json({ [`${this.collection}s`]: items });
  };

  show = async (req: Request, res: Response) => {
    const item = await this.service.getItem(req.params.id as EntityId);

    res.status(200).json({ [this.collection]: item });
  };
}
