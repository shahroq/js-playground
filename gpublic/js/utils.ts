/**
 * prefix href attrs with provided string (bs/tw, etc)
 */
export const prefixNavPaths = (navItems: unknown[], pathPrefix: string) => {
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
