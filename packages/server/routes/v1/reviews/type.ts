import type { EntityId } from "@/common/type";

export interface Review {
  id?: EntityId;
  product_id: number;
  content: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;
}
