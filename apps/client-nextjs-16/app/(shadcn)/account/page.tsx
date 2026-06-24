import { Metadata } from "next";
import { auth } from "@/auth";
import type { Page } from "@jsp/shared/types";
import { Header } from "@/shadcn/components/Header";
import { Json } from "@jsp/shared/comps";

const page: Page = {
  title: "Account",
  breadcrumb: [{ label: "Account" }],
};

export const metadata: Metadata = {
  title: "Account",
};

export default async function Page() {
  const session = await auth();

  return (
    <>
      <Header page={page} />

      <section>
        <h2>Account Page</h2>
        {`Welcome, ${session?.user?.name}`}
      </section>
    </>
  );
}
