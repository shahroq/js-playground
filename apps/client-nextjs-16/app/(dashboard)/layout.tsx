import { PropsWithChildren } from "react";
import { Header, Sidebar } from "@/comps";
import "../globals.css";

export default async function DashboardLayout({ children }: PropsWithChildren) {
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
