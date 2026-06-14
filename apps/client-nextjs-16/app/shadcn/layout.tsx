import { PropsWithChildren } from "react";
import "../globals-shadcn.css";
import { Header, Sidebar } from "@/comps";

export default async function DashboardLayoutShadcn({
  children,
}: PropsWithChildren) {
  return (
    <>
      <header>
        <Header />
      </header>
      <div className="layout">
        <aside>
          <Sidebar />
        </aside>
        <main>{children}</main>
      </div>
    </>
  );
}
