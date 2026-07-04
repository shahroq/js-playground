"use client";

import type { NavItem } from "@jsp/shared/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

type Props = {
  items: NavItem[];
  title?: string;
};

type NavItemProps = {
  item: NavItem;
  pathname: string;
  depth?: number;
};

type SubItemNodeProps = {
  item: NavItem;
  depth: number;
  pathname: string;
};

export function NavSidebar({ items, title }: Props) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <NavItemNode
            key={item.label}
            item={item}
            depth={0}
            pathname={pathname}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

// Top-level items: rendered inside <SidebarMenu> (<ul>), so must be <li> via SidebarMenuItem
function NavItemNode({ item, pathname, depth = 0 }: NavItemProps) {
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
              <SubItemNode
                key={child.label}
                item={child}
                pathname={pathname}
                depth={depth + 1}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

// Sub-level items: rendered inside <SidebarMenuSub> (<ul>), wrapped in SidebarMenuSubItem (<li>).
// Children recurse back into SubItemNode, never NavItemNode, to avoid <li>-in-<li>.
function SubItemNode({ item, pathname, depth }: SubItemNodeProps) {
  const hasChildren = !!item.items?.length;
  const hasPath = !!item.path;
  const active = item.path === pathname;

  if (!hasChildren) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild isActive={active}>
          <Link href={item.path || "#"} className="">
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
