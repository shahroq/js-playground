import { describe, it, expect } from "bun:test";
import { tmp } from ".";

describe("tmp function", () => {
  it("should be defined", () => {
    expect(typeof tmp).toEqual("function");
  });

  it("should work properly", () => {
    expect(tmp()).toBe(undefined);
  });
});
