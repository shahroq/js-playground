import type { ComponentProps } from "react";
// import { auth } from "@/auth";
import { site } from "@jsp/shared/json";
import { Brand } from "./Brand";
import { NavSidebar } from "./NavSidebar";
import { NavUser } from "./NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/shadcn/components/ui/sidebar";
import type { NavItem } from "@jsp/shared/types";
import { filterNavItems } from "@jsp/shared/utils";

export async function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  // const session = await auth();
  // console.log(session);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Brand />
      </SidebarHeader>
      <SidebarContent>
        <NavSidebar
          items={filterNavItems(site.navSide, "client-nextjs-16") as NavItem[]}
          title="Tailwind"
        />
        <NavSidebar
          items={
            filterNavItems(site.navSideShadcn, "client-nextjs-16") as NavItem[]
          }
          title="Shadcn"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser variant="full" />
      </SidebarFooter>
    </Sidebar>
  );
}
