import type { EntityId } from "@/common/types";
import type { IUser, UserRole } from "../types";

// Response DTO
export class UserDto {
  private constructor(
    public readonly id: EntityId,
    public readonly name: string,
    public readonly email: string,
    public readonly role: UserRole
  ) {}

  static from(entity: IUser): UserDto {
    return new UserDto(entity.id, entity.name, entity.email, entity.role);
  }

  static fromMany(entities: IUser[]): UserDto[] {
    return entities.map((entity) => UserDto.from(entity));
  }
}
