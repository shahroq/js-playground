import { PropsWithChildren, CSSProperties } from "react";
import { AppSidebar } from "@/shadcn/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shadcn/components/ui/sidebar";
import "../globals-shadcn.css";

export default async function DashboardLayoutShadcn({
  children,
}: PropsWithChildren) {
  return (
    <div className="layout layout-shadcn">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}
