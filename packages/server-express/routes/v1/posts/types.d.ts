import type { EntityId } from "@/common/types";

export interface Post {
  id?: EntityId;
  title: string;
  body: string;
  userId: number;
}
