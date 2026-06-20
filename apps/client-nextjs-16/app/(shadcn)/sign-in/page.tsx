import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { home } from "@/auth/consts";
import { Header } from "@/shadcn/components/Header";
import type { Page } from "@jsp/shared/types";
import FormSignIn from "./FormSignIn";

const page: Page = {
  title: "Sign In",
  breadcrumb: [{ label: "Sign In" }],
};

export const metadata: Metadata = {
  title: "Sign In",
};

type Props = {
  searchParams: Promise<{ callbackUrl: string }>;
};

export default async function Page(props: Props) {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();
  if (session) redirect(callbackUrl || home);

  return (
    <>
      <Header page={page} />

      <section>
        <FormSignIn />
      </section>
    </>
  );
}
