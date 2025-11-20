import { BaseRepository } from "@/common/repository/base-repository";
import type { User } from "./type";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super("users");
  }
}
