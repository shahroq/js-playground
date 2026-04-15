import {
  describe,
  it,
  test,
  expect,
  assert,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
} from "bun:test";

const sum = (a: number, b: number = 0) => a + b;

beforeAll(() => {
  // console.log("bef ALL!");
});

beforeEach(() => {
  // console.log("bef EACH!");
});

afterEach(() => {
  // console.log("af EACH!");
});

afterAll(() => {
  // console.log("af ALL!");
});

describe("adding numbers correctly:", () => {
  it("should add two numbers", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(10, 2)).toEqual(12);
    expect(sum(50, 25)).toBeTruthy(75);
  });

  test("should add one number with def value correctly", () => {
    expect(sum(0)).toEqual(0);
  });
});
