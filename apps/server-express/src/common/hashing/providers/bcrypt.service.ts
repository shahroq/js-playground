import bcrypt from "bcrypt";
import type { IHashingService } from "../hashing-service.interface";

const SALT_ROUNDS = 10;

export class BcryptService implements IHashingService {
  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, SALT_ROUNDS);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
