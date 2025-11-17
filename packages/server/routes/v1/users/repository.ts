import type { User } from "../../../common/types";
import { BaseRepository } from "../../../common/base-repository";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super("users");
  }
}
