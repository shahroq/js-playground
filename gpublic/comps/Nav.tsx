import type { NavItem } from "../types/types";
import { isActivePath } from "../utils/nav";

type LinkComponentProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

type Props = {
  navItems: NavItem[];
  curPath?: string;
  className?: string;
  level?: number;
  Link: React.ComponentType<LinkComponentProps>;
};

type PropsNavItem = {
  item: NavItem;
  curPath?: string;
  level?: number;
  Link: React.ComponentType<LinkComponentProps>;
};

export function Nav({
  navItems,
  curPath,
  className,
  level = 0,
  Link,
  ...rest
}: Props) {
  return (
    <ul
      className={[className].filter(Boolean).join(" ")}
      data-level={level}
      {...rest}
    >
      {navItems.map((item, i) => (
        <NavItemView
          key={i}
          item={item}
          curPath={curPath}
          level={level}
          Link={Link}
        />
      ))}
    </ul>
  );
}

function NavItemView({ item, curPath, level = 0, Link }: PropsNavItem) {
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
          className="nav nav-vertical"
          level={level + 1}
          curPath={curPath}
          Link={Link}
        />
      )}
    </li>
  );
}
