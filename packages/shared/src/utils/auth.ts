export function getInitials(name: string): string {
  if (!name || typeof name !== "string") return "";

  // Trim and split by whitespace, filtering out empty strings
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "";

  // Take first letter of each word, uppercase, and join (typically first 2-3)
  const initials = words
    .map((word) => word[0])
    .map((char) => char.toUpperCase())
    .join("");

  // Common convention: limit to first two initials for display purposes
  return initials.length > 2 ? initials.slice(0, 2) : initials;
}
