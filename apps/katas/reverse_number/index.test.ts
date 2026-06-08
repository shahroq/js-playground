import { describe, it, expect } from "bun:test";
import { reverse_number } from ".";

describe("reverse_number function", () => {
  it("should be defined", () => {
    expect(typeof reverse_number).toEqual("function");
  });

  it("should reverse any number", () => {
    expect(reverse_number(15)).toBe(51);
    expect(reverse_number(981)).toBe(189);
    expect(reverse_number(500)).toBe(5);
    expect(reverse_number(-15)).toBe(-51);
    expect(reverse_number(-90)).toBe(-9);
  });
});
