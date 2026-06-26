import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shadcn/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shadcn/components/ui/sidebar";
import type { NavItem } from "@jsp/shared/types";
import { Link } from "@/modules/router";

type Props = {
  items: NavItem[];
  title?: string;
};

type NavItemProps = {
  item: NavItem;
  depth?: number;
};

export function NavSidebar({ items, title }: Props) {
  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <NavItemNode key={item.label} item={item} depth={0} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

// Top-level items: rendered inside <SidebarMenu> (<ul>), so must be <li> via SidebarMenuItem
function NavItemNode({ item, depth = 0 }: NavItemProps) {
  const hasChildren = !!item.items?.length;
  const hasPath = !!item.path;

  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={item.label}>
          <Link href={item.path || "#"}>
            <span>{item.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        defaultOpen={depth === 0}
        className="group/collapsible w-full"
      >
        <div className="flex items-center w-full">
          {hasPath ? (
            <SidebarMenuButton asChild className="flex-1" tooltip={item.label}>
              <Link href={item.path!}>
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton asChild className="flex-1" tooltip={item.label}>
              <span>{item.label}</span>
            </SidebarMenuButton>
          )}
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="w-auto px-1">
              <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items!.map((child) => (
              <SubItemNode key={child.label} item={child} depth={depth + 1} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

// Sub-level items: rendered inside <SidebarMenuSub> (<ul>), wrapped in SidebarMenuSubItem (<li>).
// Children recurse back into SubItemNode, never NavItemNode, to avoid <li>-in-<li>.
function SubItemNode({ item, depth }: { item: NavItem; depth: number }) {
  const hasChildren = !!item.items?.length;
  const hasPath = !!item.path;

  if (!hasChildren) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link href={item.path || "#"}>
            <span>{item.label}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  }

  return (
    <SidebarMenuSubItem>
      <Collapsible
        defaultOpen={depth <= 1}
        className="group/collapsible w-full"
      >
        <div className="flex items-center w-full">
          {hasPath ? (
            <SidebarMenuSubButton asChild className="flex-1">
              <Link href={item.path!}>
                <span>{item.label}</span>
              </Link>
            </SidebarMenuSubButton>
          ) : (
            <SidebarMenuSubButton asChild className="flex-1">
              <span>{item.label}</span>
            </SidebarMenuSubButton>
          )}
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton className="w-auto px-1">
              <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuSubButton>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items!.map((child) => (
              <SubItemNode key={child.label} item={child} depth={depth + 1} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuSubItem>
  );
}
