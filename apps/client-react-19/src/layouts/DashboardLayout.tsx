import type { PropsWithChildren } from "react";
import { Header } from "@/comps/Header";
import { Sidebar } from "@/comps/Sidebar";
// import "../index.css";

export default function DashboardLayout({ children }: PropsWithChildren) {
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
