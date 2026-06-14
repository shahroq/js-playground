import { PropsWithChildren } from "react";
import { Header, Sidebar } from "@/comps";
import "../globals.css";
import "../globals-shadcn.css";

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
