import {
  describe,
  it,
  test,
  expect,
  beforeEach,
  afterEach,
  spyOn,
} from "bun:test";
import { steps } from ".";

describe("steps function", () => {
  let logSpy;

  it.skip("should be defined", () => {
    expect(typeof steps).toEqual("function");
  });

  it.skip("should print steps", () => {
    expect(steps(3)).toBe(undefined);
    expect(steps(5)).toBe(undefined);
    expect(steps(10)).toBe(undefined);
  });

  test("steps called with n = 1", () => {
    steps(1);
    expect(console.log.mock.calls[0][0]).toEqual("#");
    expect(console.log.mock.calls.length).toEqual(1);
  });

  test.skip("steps called with n = 2", () => {
    steps(2);
    // expect(console.log.mock.calls[0][0]).toEqual("# ");
    // expect(console.log.mock.calls[1][0]).toEqual("##");
    // expect(console.log.mock.calls.length).toEqual(2);
  });

  test.skip("steps called with n = 3", () => {
    steps(3);
    expect(console.log.mock.calls[0][0]).toEqual("#  ");
    expect(console.log.mock.calls[1][0]).toEqual("## ");
    expect(console.log.mock.calls[2][0]).toEqual("###");
    expect(console.log.mock.calls.length).toEqual(3);
  });

  beforeEach(() => {
    logSpy = spyOn(console, "log");
  });

  afterEach(() => {
    logSpy.mockRestore();
  });
});
