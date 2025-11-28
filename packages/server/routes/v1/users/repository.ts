import { BaseRepository } from "@/common/repository/base.repository";
import type { User } from "./types";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super("users");
  }
}
