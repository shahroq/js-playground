import path from "path";
import { fileURLToPath } from "url";
import { setTimeout } from "node:timers/promises";

export function add(a: number, b: number) {
  return a + b;
}

/**
 * Determines whether the given value is a *real* string — meaning
 * a non-empty string that does **not** represent a numeric value.
 *
 * This function excludes:
 * - numeric strings (e.g. "2", "3.14", "-5", "001")
 * - empty strings ("")
 * - whitespace-only strings ("   ")
 *
 * It returns `true` only for semantic strings such as:
 * - "hello"
 * - "abc123"
 * - "John Doe"
 *
 * @param value - Any value to be tested.
 * @returns `true` if the value is a non-numeric, non-empty string; otherwise `false`.
 *
 * @example
 * isRealString("hello");  // true
 * isRealString("abc123"); // true
 *
 * isRealString("2");      // false
 * isRealString("3.14");   // false
 * isRealString("");       // false
 * isRealString(2);        // false
 */
export function isRealString(value: unknown): value is string {
  return (
    typeof value === "string" && value.trim() !== "" && isNaN(Number(value))
  );
}

/**
 * Returns an ISO 8601 formatted string for a given date.
 *
 * By default, it returns the local time in ISO-like format (without the trailing 'Z').
 * You can pass `false` as the second argument to get the standard UTC ISO string.
 *
 * @param date - The Date object to format. Defaults to `new Date()`.
 * @param local - Whether to return the date in local time (`true`) or UTC (`false`). Defaults to `true`.
 * @returns A string in ISO 8601 format, either local-adjusted or standard UTC.
 *
 * @example
 * formatISO();                        // "2025-11-08T17:22:30.123" (local time)
 * formatISO(new Date(), false);       // "2025-11-08T16:22:30.123Z" (UTC)
 */
export function formatISO(
  date: Date = new Date(),
  local: boolean = false
): string {
  if (!local) return date.toISOString();

  const offsetMs = date.getTimezoneOffset() * 60000; // convert offset
  // to ms
  const localTime = new Date(date.getTime() - offsetMs);
  return localTime.toISOString();
}

/** check if the value is url of type file(starts with file://..) */
export function isFileURL(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "file:";
  } catch {
    return false;
  }
}
// console.log(isFileURL("file:///Users/me/dev.db")); // true
// console.log(isFileURL("file:./data/dev.db"));      // true
// console.log(isFileURL("mysql://localhost/test"));  // false
// console.log(isFileURL("./dev.db"));                // false
// console.log(isFileURL("not a url"));               // false

interface GetDbIdentifierOptions {
  withExtension?: boolean;
}

/** returns database name, which can be file name(json, sqllite) or database name (mysql, postgres, etc) */
export function getDBIdentifier(
  dbUrl: string,
  { withExtension = false }: GetDbIdentifierOptions = {}
): string {
  try {
    const url = new URL(dbUrl);

    if (url.protocol === "file:") {
      const filename = path.basename(fileURLToPath(url));
      return withExtension ? filename : path.parse(filename).name;
    }

    // For non-file URLs (e.g., mysql://, postgres://)
    return url.pathname.replace(/^\//, "");
  } catch {
    // Handle plain file paths (not valid URLs)
    const filename = path.basename(dbUrl);
    return withExtension ? filename : path.parse(filename).name;
  }
}
/*
console.log(getDBIdentifier("file:./data/dev.db")); // → "dev"
console.log(getDBIdentifier("file:./data/dev.db", { withExtension: true })); // → "dev.db"
console.log(getDBIdentifier("mysql://root@localhost/testdb")); // → "testdb"
console.log(getDBIdentifier("./local.sqlite", { withExtension: true })); // → "local.sqlite"
*/

type TruncatePosition = "start" | "middle" | "end";
interface TruncateOptions {
  maxLength?: number;
  position?: TruncatePosition;
  ellipsis?: string;
}

export function truncateString(str: string, options: TruncateOptions): string {
  const { maxLength = 30, position = "end", ellipsis = "..." } = options;

  if (str.length <= maxLength) return str;

  const visibleLength = maxLength - ellipsis.length;

  switch (position) {
    case "start":
      return ellipsis + str.slice(-visibleLength);
    case "middle": {
      const half = Math.floor(visibleLength / 2);
      return str.slice(0, half) + ellipsis + str.slice(-half);
    }
    case "end":
    default:
      return str.slice(0, visibleLength) + ellipsis;
  }
}
// truncateString("This is a long string", { maxLength: 10 }); // → "This is..."
// truncateString("This is a long string", { maxLength: 10, position: "start" }); // → "...g string"
// truncateString("/packages/server/data/lowdb-json/database.json", { maxLength: 30, position: "middle" }); // → "/packages/ser...ase.json"
// truncateString("HelloWorld", { maxLength: 8, position: "end", ellipsis: "--" }); // → "Hello--"

export async function getUserAsync(id: number) {
  console.log(`getting user from db with id: ${id}`);
  await setTimeout(1000);
  return { id, username: "shm", role: "ADMIN" };
}

export function getUserSync(id: number) {
  console.log(`getting user from db with id: ${id}`);
  return { id, username: "shm", role: "ADMIN" };
}

export function isAdmin(user_id: number) {
  const user = getUserSync(user_id);
  return user.role == "ADMIN";
}

// test
// const admin = isAdmin(1);
// console.log(admin);
