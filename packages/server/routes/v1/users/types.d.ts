import type { EntityId, IBaseQuery, IBaseQueryResult } from "@/common/types";

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

export interface IUserQuery extends IBaseQuery {
  id?: EntityId;
}

export interface IUserQueryResult extends IBaseQueryResult {
  users: User[];
  meta: IBaseQueryResult;
}
