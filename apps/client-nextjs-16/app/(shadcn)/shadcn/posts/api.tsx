import { pause } from "@jsp/shared/utils";
import { Post } from "@jsp/shared/types";
import { postsSchema } from "@jsp/shared/validations/zod";

const LIMIT = 3;
const POSTS_URL = `https://jsonplaceholder.typicode.com/posts`;

export async function getPosts(limit = LIMIT): Promise<Post[]> {
  await pause(500);
  const res = await fetch(`${POSTS_URL}?_limit=${limit}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  const json = await res.json();
  return postsSchema.parse(json);
}
