import { describe, it, expect } from "bun:test";
import { Node, LinkedList } from "./";

describe("Node class", () => {
  it.skip("Should be a constructor", () => {
    expect(typeof Node.prototype.constructor).toEqual("function");
  });

  it.skip("Should have props `data` & `next`", () => {
    const node = new Node("a", "b");
    expect(node.data).toEqual("a");
    expect(node.next).toEqual("b");
  });
});

describe("Linked List class", () => {
  it.skip("Should be a constructor", () => {
    expect(typeof LinkedList.prototype.constructor).toEqual("function");
  });

  it.skip("Should have a prop `head` with null value", () => {
    const ll = new LinkedList();
    expect(ll.head).toEqual(null);
  });

  it.skip("Should append a node to the start of a list", () => {
    const ll = new LinkedList();

    ll.insertFirst("John");
    expect(ll.head.data).toEqual("John");
    ll.insertFirst("Jane");
    expect(ll.head.data).toEqual("Jane");
  });

  it.skip("Should return size of a list", () => {
    const ll = new LinkedList();
    expect(ll.size()).toEqual(0);

    ll.insertFirst("John");
    ll.insertFirst("Jane");
    ll.insertFirst("Jill");
    expect(ll.size()).toEqual(3);
  });

  it.skip("get at", () => {
    const ll = new LinkedList();
    ll.insertFirst("User 1");
    ll.insertFirst("User 2");
    ll.insertFirst("User 3");
    expect(ll.getAt(0).data).toEqual("User 3");
    expect(ll.getAt(1).data).toEqual("User 2");
    expect(ll.getAt(2).data).toEqual("User 1");
    expect(ll.getAt(8).data).toEqual(null);
  });
});
