import type { EntityId } from "@/common/type";

export interface Post {
  id?: EntityId;
  title: string;
  body: string;
  userId: number;
}
