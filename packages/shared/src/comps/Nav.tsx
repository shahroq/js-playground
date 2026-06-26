import type { NavItem } from "../types/types";
import { cn, isActivePath } from "../utils";

type LinkComponentProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

type Props = {
  items: NavItem[];
  curPath?: string;
  className?: string;
  level?: number;
  Link: React.ComponentType<LinkComponentProps>;
  title?: string;
};

type PropsNavItem = {
  item: NavItem;
  curPath?: string;
  level?: number;
  Link: React.ComponentType<LinkComponentProps>;
};

export function Nav({
  items,
  curPath,
  className,
  level = 0,
  Link,
  title,
  ...rest
}: Props) {
  return (
    <>
      {title && <div className="nav-label">{title}</div>}
      <ul className={cn(className)} data-level={level} {...rest}>
        {items.map((item, i) => (
          <NavItemView
            key={i}
            item={item}
            curPath={curPath}
            level={level}
            Link={Link}
          />
        ))}
      </ul>
    </>
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
          className={cn(
            "nav-link",
            isActive && "active",
            isDisabled && "disabled",
          )}
        >
          {item.label}
        </Link>
      ) : (
        <span className="nav-link disabled">{item.label}</span>
      )}

      {item.items?.length && (
        <Nav
          items={item.items}
          className="nav nav-vertical"
          level={level + 1}
          curPath={curPath}
          Link={Link}
        />
      )}
    </li>
  );
}
