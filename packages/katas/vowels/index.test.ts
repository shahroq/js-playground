import { describe, it, expect } from "bun:test";
import { vowels } from ".";

describe("vowels function", () => {
  it("should be defined", () => {
    expect(typeof vowels).toEqual("function");
  });

  it("should work properly", () => {
    expect(vowels("Apple")).toBe(2);
    expect(vowels("Bananas are yellow")).toBe(7);
    expect(vowels("Why?!")).toBe(0);
  });
});
