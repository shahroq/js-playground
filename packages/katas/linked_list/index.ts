export class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

export class LinkedList {
  // head: points to the 1st in the list
  constructor() {
    this.head = null;
  }

  size() {
    let counter = 0;

    let node = this.head;
    while (node) {
      counter++;
      node = node.next;
    }

    return counter;
  }

  insertFirst(data) {
    this.head = new Node(data, this.head);
  }

  insertLast() {}
  insertAt() {}

  getAt(index = 0) {
    if (!this.head) return null;

    let counter = 0;
    let node = this.head;
    // console.log("0-" + node.data);

    while (node) {
      if (counter === index) return node;

      counter++;
      node = node.next;
    }

    return null;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    if (!this.head) return null;

    let node = this.head;
    while (node) {
      if (!node.next) return node;
      node = node.next;
    }
    return node;
  }

  removeAt() {}
  removeFirst() {}
  removeLast() {}

  printListData() {}

  clear() {
    this.head = null;
  }

  forEach(fn) {
    let counter = 0;
    let node = this.head;

    while (node) {
      fn(node, counter);
      node = node.next;
      counter++;
    }
  }
}

const ll = new LinkedList();
ll.insertFirst("User 1");
ll.insertFirst("User 2");
ll.insertFirst("User 3");

ll.forEach((node, i) => {
  node.data += "edited";
});
console.log(ll);
