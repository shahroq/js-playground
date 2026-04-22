import { describe, it, expect } from "bun:test";
import { reverse_string } from ".";

describe("reverse_string function", () => {
  it("should be defined", () => {
    expect(typeof reverse_string).toEqual("function");
  });

  it("should reverse any string", () => {
    expect(reverse_string("abc")).toBe("cba");
    expect(reverse_string("123")).toBe("321");
    expect(reverse_string("Greeting!")).toBe("!gniteerG");
    expect(reverse_string("s")).toBe("s");
    expect(reverse_string("")).toBe("");
  });
});
