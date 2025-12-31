import type { UserRole } from "../types";

// Request DTO
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
}
