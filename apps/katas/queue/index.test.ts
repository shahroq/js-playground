import { describe, it, expect, beforeAll, beforeEach } from "bun:test";
import { Queue } from ".";

describe("Queue class", () => {
  beforeAll(() => {});
  beforeEach(() => {});

  it("should be defined", () => {
    const q = new Queue();
    expect(typeof q).toEqual("object");
  });

  it("should enqueue", () => {
    const q = new Queue();
    q.enqueue("Jack");
    expect(q.length()).toBe(1);
  });

  it("should dequeue", () => {
    const q = new Queue();
    q.enqueue("Jack");
    expect(q.dequeue()).toBe("Jack");
  });
});
