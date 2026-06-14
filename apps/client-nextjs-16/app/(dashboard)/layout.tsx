import { PropsWithChildren } from "react";
import { Header, Sidebar } from "@/comps";
import "../globals.css";

export default async function DashboardLayout({ children }: PropsWithChildren) {
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
