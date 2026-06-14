import type { PropsWithChildren } from "react";
import { Header } from "@/comps/Header";
import { Sidebar } from "@/comps/Sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <header>
        <Header />
      </header>
      <div className="layout layout-tw">
        <aside>
          <Sidebar />
        </aside>
        <main>{children}</main>
      </div>
    </>
  );
}
