import { describe, it, expect } from "bun:test";
import { fib, fastFib, fastFibInt } from ".";

describe("fib function", () => {
  it("should be defined", () => {
    expect(typeof fib).toEqual("function");
  });

  // [0,1,  1,2,3,5,8,13,21,34]`
  it.skip("should calc fib for 0", () => expect(fib(0)).toBe(0));
  it.skip("should calc fib for 1", () => expect(fib(1)).toBe(1));
  it.skip("should calc fib for 2", () => expect(fib(2)).toBe(1));
  it.skip("should calc fib for 3", () => expect(fib(3)).toBe(2));
  it.skip("should calc fib for 4", () => expect(fib(4)).toBe(3));
  it.skip("should calc fib for 5", () => expect(fib(5)).toBe(5));
  it.skip("should calc fib for 6", () => expect(fib(6)).toBe(8));
  it.skip("should calc fib for 7", () => expect(fib(7)).toBe(13));
  it.skip("should calc fib for 8", () => expect(fib(8)).toBe(21));
  it.skip("should calc fib for 9", () => expect(fib(9)).toBe(34));
  it.skip("should calc fib for 15", () => expect(fib(10)).toBe(55));
  it("should calc fib for 40", () => expect(fib(40)).toBe(102334155));
  it("should calc [fst/int]fib for 40", () =>
    expect(fastFibInt(40)).toBe(102334155));
  it("should calc [fst]fib for 40", () => expect(fastFib(40)).toBe(102334155));
});
