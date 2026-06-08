import { describe, it, expect } from "bun:test";
import { capitalize_sen } from ".";

describe("tmp function", () => {
  it("should be defined", () => {
    expect(typeof capitalize_sen).toEqual("function");
  });

  it("should capitalize the string", () => {
    expect(capitalize_sen("a short sentence")).toBe("A Short Sentence");
    expect(capitalize_sen("a lazy fox")).toBe("A Lazy Fox");
    expect(capitalize_sen("look, it is working!")).toBe("Look, It Is Working!");
  });
});
