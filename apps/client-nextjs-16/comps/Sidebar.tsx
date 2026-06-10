"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@jsp/shared/json";
import { filterNavItems } from "@jsp/shared/lib";
import type { NavItem } from "@jsp/shared/types";
import { Nav } from "@jsp/shared/comps";
import { NavUser } from "./NavUser";

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
