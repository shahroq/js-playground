// prefix href attrs with provided string (bs/tw, etc)
export const prefixNavItems = (navItems, pathPrefix) => {
  const prefixedNavItemsString = JSON.stringify(navItems).replace(
    /"href":\s*"(.*?)"/g,
    (match, hrefValue) => {
      // Check if hrefValue is an empty string OR starts with "/"
      if (hrefValue === "" || hrefValue.startsWith("/")) {
        // Only add prefix if it's not already there (avoids double prefixing if run multiple times)
        // This check assumes there's no prefix already. If there might be, it needs more complex logic.
        if (!hrefValue.startsWith(pathPrefix)) {
          // Basic check to avoid double prefixing
          return `"href": "${pathPrefix}${hrefValue}"`;
        }
      }
      // If the condition is not met, return the original match to leave it unchanged
      return match;
    },
  );
  return JSON.parse(prefixedNavItemsString);
};
