import { describe, it, expect } from "bun:test";
import { chunk } from ".";

describe("chunk function", () => {
  it("should be defined", () => {
    expect(typeof chunk).toEqual("function");
  });

  it("should chunk the arrays correctly", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(chunk([1, 2, 3, 4, 5], 2), 2).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7],
    ]);
    expect(chunk([1, 2, 3, 4, 5], 4)).toEqual([[1, 2, 3, 4], [5]]);
    expect(chunk([1, 2, 3, 4, 5], 10)).toEqual([[1, 2, 3, 4, 5]]);
  });
});
