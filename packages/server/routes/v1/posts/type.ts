import type { EntityId } from "@/common/type/type";

export interface Post {
  id?: EntityId;
  title: string;
  body: string;
  userId: number;
}
