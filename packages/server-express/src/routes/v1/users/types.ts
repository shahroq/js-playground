import type { NormQuery } from "@/common/query/types";
import type { EntityId } from "@/common/types";

export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  USER = "USER",
}

// raw use (from db)
export interface IUser {
  id: EntityId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;
}

export interface IUserQuery extends NormQuery {}
