import { pause } from "@jsp/shared/utils";
import { postsSchema } from "@jsp/shared/validations/zod";
import { Post } from "./list/page";

export async function getPosts(limit = 10): Promise<Post[]> {
  await pause(1000);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`,
    {
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  const json = await res.json();
  return postsSchema.parse(json);
}
