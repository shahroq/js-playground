import type { EntityId } from "@/common/types";

export interface IPost {
  id?: number;
  userId: number;
  title: string;
  body: string;
}
