import type { User } from "../../../core/types";
import { BaseRepository } from "../../../core/base-repository";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super("users");
  }
}
