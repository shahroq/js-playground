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
import { getPosts } from "../api";

const page: Page = {
  title: "Posts (API)",
  breadcrumb: [
    { label: "Shadcn" },
    { label: "Posts" },
    { label: "List (Plain)" },
  ],
};

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
  const data = await getPosts(3);

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
        {data.map((row) => (
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
                  <DropdownMenuItem disabled>Edit</DropdownMenuItem>
                  <DropdownMenuItem disabled>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" disabled>
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
