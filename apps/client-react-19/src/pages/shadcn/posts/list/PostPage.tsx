import { useEffect, useState } from "react";
import type { Page } from "@jsp/shared/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { Header } from "@/shadcn/components/Header";
import { SkeletonTable } from "@/comps/SkeletonTable";
import { Alert } from "@jsp/shared/comps";
import { getPosts } from "../api";
import type { ReadState } from "../types";

const page: Page = {
  title: "Misc",
  breadcrumb: [
    { label: "Shadcn" },
    { label: "Posts" },
    { label: "List (Plain)" },
  ],
};

export default function PostPage() {
  return (
    <>
      <Header page={page} />

      <section>
        <h2>Posts</h2>
        <PostList />
      </section>
    </>
  );
}

function PostList() {
  const [state, setState] = useState<ReadState>({
    data: [],
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        const data = await getPosts();
        setState({ ...state, data, isLoading: false });
      } catch (e) {
        setState({
          ...state,
          error: e instanceof Error ? e : new Error("Unknown error"),
        });
      } finally {
      }
    }
    loadData();
    return () => controller.abort();
  }, []);

  if (state.isLoading) return <SkeletonTable />;
  if (state.error)
    return <Alert variant="warning">{state.error.message}</Alert>;
  if (!state.data.length) return <Alert>No posts found.</Alert>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {state.data.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.id}</TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell className="text-right">.</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
