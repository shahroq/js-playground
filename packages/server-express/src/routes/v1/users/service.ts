import {
  AppError,
  AppQuery,
  config,
  PaginationSummaryDto,
  UserDto,
  CreateUserDto,
  UpdateUserDto,
} from "@/common/container";
import type { EntityId } from "@/common/types";
import { UserRepository } from "./repository";

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async getItems(appQuery: AppQuery) {
    let [items, total] = await Promise.all([
      this.repository.findAll(appQuery),
      this.repository.count(appQuery),
    ]);

    return [
      UserDto.fromMany(items),
      PaginationSummaryDto.from(appQuery, total),
    ];
  }

  async getItem(id: EntityId, appQuery: AppQuery) {
    appQuery.append({ id });

    const item = await this.repository.findOne(appQuery);
    if (!item) throw AppError.NotFound();

    return UserDto.from(item);
  }

  async createItem(createItemDto: CreateUserDto) {
    if (!createItemDto?.role)
      createItemDto = {
        ...createItemDto,
        role: config.default.user_role,
      };

    const newItem = await this.repository.create(createItemDto);
    return UserDto.from(newItem);
  }

  async updateItem(id: EntityId, updateItemDto: UpdateUserDto) {
    const updatedItem = await this.repository.update(+id, updateItemDto);
    if (!updatedItem) throw AppError.NotFound();

    return UserDto.from(updatedItem);
  }

  async deleteItem(id: EntityId) {
    const deleted = await this.repository.delete(+id);
    if (!deleted) throw AppError.NotFound();

    return deleted;
  }
}
