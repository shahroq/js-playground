import { Header } from "@/shadcn/components/Header";
import type { Page } from "@jsp/shared/types";
import { Tokenizer } from "./Tokenizer";

const page: Page = {
  title: "AI",
  breadcrumb: [{ label: "Shadcn" }, { label: "AI" }, { label: "Tokenizer" }],
};

export default function Page() {
  return (
    <>
      <Header page={page} />

      <section>
        <h2>Tokenizer</h2>
        <Tokenizer />
      </section>
    </>
  );
}
