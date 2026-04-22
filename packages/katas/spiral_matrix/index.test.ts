import { describe, it, expect } from "bun:test";
import { spiral_matrix } from ".";

describe("tmp function", () => {
  it("should be defined", () => {
    expect(typeof spiral_matrix).toEqual("function");
  });

  it("should work properly", () => {
    // expect(spiral_matrix(2)).toEqual([
    //   [1, 2],
    //   [4, 3],
    // ]);
    expect(spiral_matrix(3)).toEqual([
      [1, 2, 3],
      [8, 9, 4],
      [7, 6, 5],
    ]);
    // expect(spiral_matrix(4)).toEqual([
    //   [1, 2, 3, 4],
    //   [12, 13, 14, 5],
    //   [11, 16, 15, 6],
    //   [10, 9, 8, 7],
    // ]);
  });
});
