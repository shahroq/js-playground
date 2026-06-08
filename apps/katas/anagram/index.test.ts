import { describe, it, expect } from "bun:test";
import { anagram } from ".";

describe("anagram function", () => {
  it("should be defined", () => {
    expect(typeof anagram).toEqual("function");
  });

  it("should check if strings are anagram", () => {
    expect(anagram("rail safety", "fairy tales")).toBeTruthy();
    expect(anagram("RAIL! SAFETY!", "fairy tales")).toBeTruthy();
    expect(anagram("RAIL! SAFETY!", "fairy talesX")).toBeFalsy();
    expect(anagram("Hi there", "Bye there")).toBeFalsy();
  });
});
