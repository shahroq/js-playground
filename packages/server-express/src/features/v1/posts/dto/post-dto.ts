import type { IPost } from "../types";

// Response Dto s
export class PostDto {
  private constructor(
    public readonly id: number,
    public readonly user_id: number,
    public readonly title: string,
    public readonly body: string,
    public readonly fetched_at: Date
  ) {}

  static from(entity: IPost): PostDto {
    return new PostDto(
      entity.id,
      entity.userId,
      entity.title,
      entity.body,
      new Date()
    );
  }

  static fromMany(entities: IPost[]): PostDto[] {
    return entities.map((entity) => PostDto.from(entity));
  }
}
