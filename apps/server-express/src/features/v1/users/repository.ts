import type { IUser } from "./types";
import { BaseRepository } from "@/common/repository/base.repository";
import type { IDbClientService } from "@/common/db-client/db-client-service.interface";

export class UserRepository extends BaseRepository<IUser> {
  constructor(dbClient: IDbClientService) {
    super("users", dbClient);
  }
}
