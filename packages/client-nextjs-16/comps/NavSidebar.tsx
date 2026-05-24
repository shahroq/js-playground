import site from "@gpublic/json/site.json";
import Link from "next/link";
import { filterNavItems } from "@/gpublic/js/utils";

type NavItem = {
  label: string;
  path?: string;
  children?: NavItem[];
  target?: string[];
};

type PropsNavItem = {
  item: NavItem;
  pathname: string; // cur path
  level?: number;
};

export function NavSidebar() {
  const navSide = filterNavItems(site.navSide, "client-nextjs-16");
  const pathname = "";

  return (
    <ul className={["nav nav-vertical", "level-0"].join(" ")}>
      {navSide.map((item) => (
        <NavItem
          key={item.path ?? item.label}
          item={item}
          pathname={pathname}
        />
      ))}
    </ul>
  );
}

function NavItem({ item, pathname, level = 0 }: PropsNavItem) {
  const isActive = item.path === pathname;
  const isDisabled = !item.path;

  return (
    <li>
      <Link
        href={item.path ?? ""}
        to={item.path}
        className={["nav-link", isActive && "active", isDisabled && "disabled"]
          .filter(Boolean)
          .join(" ")}
      >
        {item.label}
      </Link>

      {item.children && item.children.length > 0 && (
        <ul className={["nav nav-vertical", `level-${level + 1}`].join(" ")}>
          {item.children.map((child) => (
            <NavItem
              key={child.path ?? child.label}
              item={child}
              pathname={pathname}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
