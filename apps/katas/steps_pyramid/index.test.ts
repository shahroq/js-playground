import {
  describe,
  it,
  test,
  expect,
  afterEach,
  beforeEach,
  spyOn,
} from "bun:test";
import { pyramid } from ".";

describe("pyramid function", () => {
  let logSpy;

  it.skip("should be defined", () => {
    expect(typeof pyramid).toEqual("function");
  });

  it.skip("should print pyramid", () => {
    expect(pyramid(5)).toBe(undefined);
  });

  test.skip("steps called with n = 1", () => {
    pyramid(1);
    expect(console.log.mock.calls[0][0]).toEqual("#");
    expect(console.log.mock.calls.length).toEqual(1);
  });

  beforeEach(() => {
    logSpy = spyOn(console, "log");
  });

  afterEach(() => {
    logSpy.mockRestore();
  });
});
