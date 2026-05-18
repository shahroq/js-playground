import {
  AppError,
  config,
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  PaginationSummaryDto,
  hashingService,
} from "@/common/container";
import type { EntityId } from "@/common/types";
import { UserRepository } from "./repository";
import type { QueryObject } from "@/common/query-object/types";

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async getItems(queryObject: QueryObject) {
    let [items, total] = await Promise.all([
      this.repository.findAll(queryObject),
      this.repository.count(queryObject),
    ]);

    return [
      UserDto.fromMany(items),
      PaginationSummaryDto.from(queryObject, total),
    ];
  }

  async getItem(id: EntityId, queryObject: QueryObject) {
    const item = await this.repository.findById(id);
    if (!item) throw AppError.NotFound();

    return UserDto.from(item);
  }

  async createItem(createItemDto: CreateUserDto) {
    if (!createItemDto?.role)
      createItemDto = {
        ...createItemDto,
        password: await hashingService.hash(createItemDto.password),
        role: config.default.user_role,
      };

    const newItem = await this.repository.create(createItemDto);
    return UserDto.from(newItem);
  }

  async updateItem(id: EntityId, updateItemDto: UpdateUserDto) {
    const updatedItem = await this.repository.update(id, updateItemDto);
    if (!updatedItem) throw AppError.NotFound();

    return UserDto.from(updatedItem);
  }

  async deleteItem(id: EntityId) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw AppError.NotFound();

    return deleted;
  }
}
