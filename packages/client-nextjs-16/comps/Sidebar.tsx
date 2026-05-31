"use client";
import { usePathname } from "next/navigation";
import site from "@gpublic/json/site.json";
import { filterNavItems } from "@gpublic/utils/nav";
import type { NavItem } from "@gpublic/types/types";
import { Nav } from "@gpublic/comps/Nav";
import { NavUser } from "./NavUser";
import Link from "next/link";

let navItems: NavItem[] = site.navSide;
navItems = filterNavItems(site.navSide, "client-nextjs-16");

export function Sidebar() {
  const curPath = usePathname();
  return (
    <div className="offcanvas offcanvas-start" id="sidebar">
      <div className="offcanvas-header">
        <h2>Pixel</h2>
        <button type="button" data-dismiss="offcanvas">
          ×
        </button>
      </div>

      <div className="offcanvas-body py-4">
        <Nav
          navItems={navItems}
          curPath={curPath}
          className={"nav nav-vertical"}
          Link={Link}
        />
        <hr />
        <NavUser />
      </div>
    </div>
  );
}
