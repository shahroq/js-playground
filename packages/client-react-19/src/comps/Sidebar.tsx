import type { NavItem } from "@gpublic/types/types";
import { NavUser } from "./NavUser";
import site from "@gpublic/json/site.json";
import { filterNavItems } from "@gpublic/utils/nav";
import { Link, useNavContext } from "@/modules/router";
import { Nav } from "@gpublic/comps/Nav";

let navItems: NavItem[] = site.navSide;
navItems = filterNavItems(site.navSide, "client-react-19");

export function Sidebar() {
  const { curPath } = useNavContext();

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
