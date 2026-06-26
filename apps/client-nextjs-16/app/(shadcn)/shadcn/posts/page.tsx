import { z } from "zod";
import type { Page } from "@jsp/shared/types";
import { Header } from "@/shadcn/components/Header";

import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { Suspense } from "react";
import { SkeletonTable } from "@/shadcn/components/SkeletonTable";
import { pause } from "@jsp/shared/utils";
import { postSchema, postsSchema } from "@jsp/shared/validations/zod";

export type Post = z.infer<typeof postSchema>;

const page: Page = {
  title: "Posts",
  breadcrumb: [{ label: "Shadcn" }, { label: "Posts" }],
};

async function getPosts(limit = 10): Promise<Post[]> {
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

export default function Page() {
  return (
    <>
      <Header page={page} />

      <section>
        <h2>Posts</h2>
        <Suspense fallback={<SkeletonTable />}>
          <PostList />
        </Suspense>
      </section>
    </>
  );
}

async function PostList() {
  const posts = await getPosts(3);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.id}</TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
