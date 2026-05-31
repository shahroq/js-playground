"use client";
import Link from "next/link";
import type { NavItem } from "@gpublic/types/types";
import { isActivePath } from "@gpublic/utils/nav";

type Props = {
  navItems: NavItem[];
  curPath: string;
  className?: string;
  level?: number;
};

type PropsNavItem = {
  item: NavItem;
  curPath: string;
  level?: number;
};

export function Nav({ navItems, curPath, className, level = 0 }: Props) {
  return (
    <ul
      className={["nav", className].filter(Boolean).join(" ")}
      data-level={level}
    >
      {navItems.map((item, i) => (
        <NavItemView key={i} item={item} curPath={curPath} level={level} />
      ))}
    </ul>
  );
}

function NavItemView({ item, curPath, level = 0 }: PropsNavItem) {
  const isActive = isActivePath(curPath, item?.path);
  const isDisabled = !item.path;

  return (
    <li>
      {item.path ? (
        <Link
          href={item.path}
          className={[
            "nav-link",
            isActive && "active",
            isDisabled && "disabled",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {item.label}
        </Link>
      ) : (
        <span className="nav-link disabled">{item.label}</span>
      )}

      {item.children?.length && (
        <Nav
          navItems={item.children}
          className="nav-vertical"
          level={level + 1}
          curPath={curPath}
        />
      )}
    </li>
  );
}
