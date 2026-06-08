import { describe, it, expect, beforeAll, beforeEach } from "bun:test";
import { Stack } from ".";

describe("Stack class", () => {
  beforeAll(() => {});
  beforeEach(() => {});

  it("should be defined", () => {
    const stack = new Stack();
    expect(typeof stack).toEqual("object");
  });

  it("should push items correctly", () => {
    const stack = new Stack();
    stack.push("Jack");
    stack.push("Jane");
    expect(stack.length()).toBe(2);
  });

  it("should pop items correctly", () => {
    const stack = new Stack();
    stack.push("Jack");
    stack.pop();
    expect(stack.length()).toBe(0);
  });

  it("should pop correctly, when stack is empty", () => {
    const stack = new Stack();
    expect(stack.pop()).toBe(undefined);
  });
});
