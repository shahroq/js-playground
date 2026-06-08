import { describe, it, expect } from "bun:test";
import { bubble_sort, selection_sort, merge_sort } from ".";

describe.skip("bubble sort function", () => {
  it("should be defined", () => {
    expect(typeof bubble_sort).toEqual("function");
  });

  it("should work properly", () => {
    expect(bubble_sort([])).toEqual([]);
    expect(bubble_sort([1])).toEqual([1]);
    expect(bubble_sort([6, 5, 1])).toEqual([1, 5, 6]);
    expect(bubble_sort([6, -8, 1, 0, 5])).toEqual([-8, 0, 1, 5, 6]);
  });
});

describe.skip("selection sort function", () => {
  it("should be defined", () => {
    expect(typeof selection_sort).toEqual("function");
  });

  it("should work properly", () => {
    expect(selection_sort([])).toEqual([]);
    expect(selection_sort([1])).toEqual([1]);
    expect(selection_sort([6, 5, 1])).toEqual([1, 5, 6]);
    expect(selection_sort([6, -8, 1, 0, 5])).toEqual([-8, 0, 1, 5, 6]);
  });
});

describe("merge sort function", () => {
  it("should be defined", () => {
    expect(typeof merge_sort).toEqual("function");
  });

  it("should work properly", () => {
    expect(merge_sort([6, 1, 5])).toBe([1, 5, 6]);
  });
});
