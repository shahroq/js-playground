import { describe, it, expect } from "bun:test";
import { palindrome } from ".";

describe("palindrome function", () => {
  it("should be defined", () => {
    expect(typeof palindrome).toEqual("function");
  });

  it("should ...", () => {
    expect(palindrome("abba")).toBe(true);
    expect(palindrome("abbas")).toBe(false);
    expect(palindrome("aa")).toBe(true);
    expect(palindrome("a")).toBe(true);
  });
});
