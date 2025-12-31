import type { IUser } from "./types";
import { BaseRepository } from "@/common/repository/base.repository";
import type { IDbClient } from "@/common/db-client/db-client.interface";
import { usersQueryPolicy as queryPolicy } from "@/common/container";

export class UserRepository extends BaseRepository<IUser> {
  constructor(dbAdapter: IDbClient) {
    super("users", queryPolicy, dbAdapter);
  }
}
