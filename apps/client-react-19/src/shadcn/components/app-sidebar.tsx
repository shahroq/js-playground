import type { ComponentProps } from "react";
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

const items = filterNavItems(site.navSide, "client-react-19") as NavItem[];

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Brand />
      </SidebarHeader>
      <SidebarContent>
        <NavSidebar items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={site.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
