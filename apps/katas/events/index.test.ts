import { describe, test, it, expect } from "bun:test";
import { Events } from ".";

const ev = new Events();

describe("Event class", () => {
  it("Should be a constructor", () => {
    expect(typeof Events.prototype.constructor).toBe("function");
  });

  it("Should be defined", () => {
    expect(typeof ev).toBe("object");
  });
});
