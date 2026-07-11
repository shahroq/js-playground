import type { Post } from "@jsp/shared/types";

export type ReadState = {
  data: Post[];
  error: Error | null;
  isLoading: boolean;
};
