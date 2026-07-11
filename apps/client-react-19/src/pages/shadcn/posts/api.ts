import type { Post } from "@jsp/shared/types";
import { pause } from "@jsp/shared/utils";

const LIMIT = 3;
const POSTS_URL = `https://jsonplaceholder.typicode.com/posts`;

export async function getPosts(limit = LIMIT) {
  await pause(500);
  const res = await fetch(`${POSTS_URL}?_limit=${LIMIT}`);
  if (!res.ok) throw new Error(`Could not fecth data!`);
  const posts: Post[] = await res.json();
  return posts;
}
