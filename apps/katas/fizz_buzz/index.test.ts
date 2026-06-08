import { describe, it, expect, beforeEach, afterEach, spyOn } from "bun:test";
import { fizz_buzz } from ".";

describe("fizz_buzz function", () => {
  let logSpy;

  it.skip("should be defined", () => {
    expect(fizz_buzz).toBeDefined();
  });

  it.skip("should call fizzbuzz with `5` prints out 5 statements", () => {
    fizz_buzz(5);
    expect(console.log.mock.calls.length).toEqual(5);
  });

  it("should call fizzbuzz with 15 prints out the correct values", () => {
    fizz_buzz(15);

    expect(console.log.mock.calls[0][0]).toEqual(1);
    expect(console.log.mock.calls[1][0]).toEqual(2);
    expect(console.log.mock.calls[2][0]).toEqual("Fizz");
    expect(console.log.mock.calls[3][0]).toEqual(4);
    expect(console.log.mock.calls[4][0]).toEqual("Buzz");
    expect(console.log.mock.calls[5][0]).toEqual("Fizz");
    expect(console.log.mock.calls[6][0]).toEqual(7);
    expect(console.log.mock.calls[7][0]).toEqual(8);
    expect(console.log.mock.calls[8][0]).toEqual("Fizz");
    expect(console.log.mock.calls[9][0]).toEqual("Buzz");
    expect(console.log.mock.calls[10][0]).toEqual(11);
    expect(console.log.mock.calls[11][0]).toEqual("Fizz");
    expect(console.log.mock.calls[12][0]).toEqual(13);
    expect(console.log.mock.calls[13][0]).toEqual(14);
    expect(console.log.mock.calls[14][0]).toEqual("FizzBuzz");
  });

  beforeEach(() => {
    // jest.spyOn(console, "log");
    logSpy = spyOn(console, "log");
  });

  afterEach(() => {
    // console.log.mockRestore();
    logSpy.mockRestore();
  });
});
