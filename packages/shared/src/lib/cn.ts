import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/*
export function cnPlain(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}
*/

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
