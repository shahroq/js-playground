type NavItem = {
  label: string;
  path?: string;
  targets?: string[];
  children?: NavItem[];
};

/**
 * prefix href attrs with provided string (bs/tw, etc)
 */
export const prefixNavPaths = (
  navItems: NavItem[],
  pathPrefix: string,
): NavItem[] => {
  const prefixedNavItemsString = JSON.stringify(navItems).replace(
    /"path":\s*"(.*?)"/g,
    (match, pathValue) => {
      // Check if hrefValue is an empty string OR starts with "/"
      if (pathValue === "" || pathValue.startsWith("/")) {
        // Only add prefix if it's not already there (avoids double prefixing if run multiple times)
        // This check assumes there's no prefix already. If there might be, it needs more complex logic.
        if (!pathValue.startsWith(pathPrefix)) {
          // Basic check to avoid double prefixing
          return `"path": "${pathPrefix}${pathValue}"`;
        }
      }
      // If the condition is not met, return the original match to leave it unchanged
      return match;
    },
  );
  return JSON.parse(prefixedNavItemsString);
};
/**
 * Filters navigation items based on the current package (workspace/app).
 * const nav = filterNavItems(navSide, "client-react-19");
 */
export const filterNavItems = (navItems: NavItem[], pkg: string): NavItem[] => {
  return navItems
    .map((item) => {
      // 1. If it has children → filter recursively
      if (item.children) {
        const filteredChildren = filterNavItems(item.children, pkg);

        // If no children remain after filtering, optionally remove the parent
        if (filteredChildren.length === 0) return null;

        return {
          ...item,
          children: filteredChildren,
        };
      }

      return item;
    })
    .filter((item): item is NavItem => {
      if (!item) return false;

      // 2. No targets → show everywhere
      if (!item.targets) return true;

      // 3. Has targets → only show if package matches
      return item.targets.includes(pkg);
    });
};
