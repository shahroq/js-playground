"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@jsp/shared/json";
import { filterNavItems } from "@jsp/shared/utils";
import type { NavItem } from "@jsp/shared/types";
import { Nav } from "@jsp/shared/comps";
import { NavUser } from "./NavUser";

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
          items={filterNavItems(site.navSide, "client-nextjs-16") as NavItem[]}
          curPath={curPath}
          className={"nav nav-vertical"}
          Link={Link}
          title="Tailwind"
        />
        <Nav
          items={
            filterNavItems(site.navSideShadcn, "client-nextjs-16") as NavItem[]
          }
          curPath={curPath}
          className={"nav nav-vertical"}
          Link={Link}
          title="Shadcn"
        />
        <hr />
        {/* <NavUser /> */}
        <NavUser user={site.user} />
      </div>
    </div>
  );
}
