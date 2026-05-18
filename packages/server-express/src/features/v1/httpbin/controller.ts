import type { Response } from "express";
import type { IHttbin } from "./types";
import { HttpbinService } from "./service";

export class HttpbinController {
  private collection = "httpbin";

  constructor(private readonly service: HttpbinService) {}

  json = async (_: any, res: Response): Promise<void> => {
    const items: IHttbin = await this.service.json();

    res.status(200).json({ [`${this.collection}s`]: items });
  };
}
