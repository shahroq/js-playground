import type { EntityId } from "@/common/type/type";

export interface User {
  id?: EntityId;
  name: string;
  email: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;
}
