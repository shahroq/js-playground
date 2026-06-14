import { PropsWithChildren } from "react";
import { Header, Sidebar } from "@/comps";
import "../globals-shadcn.css";

export default async function DashboardLayoutShadcn({
  children,
}: PropsWithChildren) {
  return (
    <div className="layout layout-tw">
      <header>
        <Header />
      </header>
      <div className="content">
        <aside>
          <Sidebar />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
