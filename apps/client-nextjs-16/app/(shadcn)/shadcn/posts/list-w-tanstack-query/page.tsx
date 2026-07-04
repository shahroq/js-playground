import { Header } from "@/shadcn/components/Header";
import type { Page } from "@jsp/shared/types";
import { PostList } from "./PostList";
import { Provider } from "./Provider";

const page: Page = {
  title: "Posts (API)",
  breadcrumb: [
    { label: "Shadcn" },
    { label: "Posts" },
    { label: "List w/ TanStack Query" },
  ],
};

export default function Page() {
  return (
    <>
      <Provider>
        <Header page={page} />

        <section>
          <h2>Posts</h2>
          <PostList />
        </section>
      </Provider>
    </>
  );
}
