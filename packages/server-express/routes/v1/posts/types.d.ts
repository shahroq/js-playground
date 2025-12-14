import type { EntityId } from "@/common/types";

export interface IPost {
  id?: EntityId;
  title: string;
  body: string;
  userId: number;
}
