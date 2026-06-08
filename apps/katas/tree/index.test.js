import { describe, it, test, expect } from "bun:test";
import { Node, Tree } from "./";

describe("Node class", () => {
  it("Should be a constructor", () => {
    expect(typeof Node.prototype.constructor).toEqual("function");
  });

  it("Should have props `data` & `children`", () => {
    const node = new Node("a");
    expect(node.data).toEqual("a");
    expect(node.children.length).toEqual(0);
  });

  test.skip("Node can add children", () => {
    const n = new Node("a");
    n.add("b");
    expect(n.children.length).toEqual(1);
    expect(n.children[0].children).toEqual([]);
  });

  test("Node can remove children", () => {
    const n = new Node("a");
    n.add("b");
    expect(n.children.length).toEqual(1);
    n.remove("b");
    expect(n.children.length).toEqual(0);
  });
});

/////////////

describe("Tree class", () => {
  it("Should be a constructor", () => {
    expect(typeof Tree.prototype.constructor).toEqual("function");
  });

  test("starts empty", () => {
    const t = new Tree();
    expect(t.root).toEqual(null);
  });

  test("Can traverse bf", () => {
    const letters = [];
    const t = new Tree();
    t.root = new Node("a");
    t.root.add("b");
    t.root.add("c");
    t.root.children[0].add("d");
    // console.dir(t, { depth: null, colors: true });
    t.traverseBF((node) => {
      letters.push(node.data);
    });

    expect(letters).toEqual(["a", "b", "c", "d"]);
  });
});
