import { describe, it, expect } from "bun:test";
import { max_char } from ".";

describe("max char function", () => {
  it("should be defined", () => {
    expect(typeof max_char).toEqual("function");
  });

  it("shoule return the most repeated char", () => {
    expect(max_char("abccccd")).toBe("c");
    expect(max_char("apple 1231111")).toBe("1");
    expect(max_char("apple")).toBe("p");
    expect(max_char("orange")).toBe("o");
    expect(max_char("238946")).toBe("2");
  });
});
