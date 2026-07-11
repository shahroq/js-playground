import type { Page, Post } from "@jsp/shared/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { Header } from "@/shadcn/components/Header";
import { useEffect, useState } from "react";
import { pause } from "@jsp/shared/utils";
import { Spinner } from "@jsp/shared/comps";

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
const LIMIT = 5;

function PostList() {
  const [data, setData] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        await pause(1500);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}`,
        );
        if (!res.ok) throw new Error(`Could not fecth data!`);
        const posts = await res.json();
        setData(posts);
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <Spinner />;

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
        {data.map((row) => (
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
