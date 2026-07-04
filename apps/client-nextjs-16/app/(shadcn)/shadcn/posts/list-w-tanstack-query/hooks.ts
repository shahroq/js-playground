import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api";

export const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(5),
  });
