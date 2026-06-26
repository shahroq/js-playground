import { Link, useRouterContext as useRouterContext } from "@/modules/router";
import { site } from "@jsp/shared/json";
import type { NavItem } from "@jsp/shared/types";
import { filterNavItems } from "@jsp/shared/utils";
import { Nav } from "@jsp/shared/comps";
import { NavUser } from "./NavUser";

export function Sidebar() {
  const { curPath } = useRouterContext();

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
          items={filterNavItems(site.navSide, "client-react-19") as NavItem[]}
          curPath={curPath}
          className={"nav nav-vertical"}
          Link={Link}
          title="Tailwind"
        />
        <Nav
          items={
            filterNavItems(site.navSideShadcn, "client-react-19") as NavItem[]
          }
          curPath={curPath}
          className={"nav nav-vertical"}
          Link={Link}
          title="Shadcn"
        />
        <hr />
        <NavUser user={site.user} />
      </div>
    </div>
  );
}
