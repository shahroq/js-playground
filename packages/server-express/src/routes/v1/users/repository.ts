import type { IUser } from "./types";
import { BaseRepository } from "@/common/repository/base.repository";
import type { IDbClient } from "@/common/db-client/db-client.interface";

export class UserRepository extends BaseRepository<IUser> {
  constructor(dbAdapter: IDbClient) {
    super("users", dbAdapter);
  }
}
