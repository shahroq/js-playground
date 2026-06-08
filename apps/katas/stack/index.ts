// --- Direction
// Lorem ...
// --- Example
// tmp() === undefined

export class Stack {
  private _items: any[] = [];
  private _count: number = 0;

  constructor() {}

  push(item: any) {
    // this._items.push(item); // don't use: cheat!
    this._items[this._count] = item;
    this._count++;
  }

  pop() {
    if (this.isEmpty()) return;

    // return this._items.pop();

    const item = this._items[this._count - 1];
    this._count--;

    // delete the item (?)
    for (let i = this._count; i < this._items.length; i++) {
      this._items[i] = this._items[i + 1];
    }

    return item;
  }

  peek() {
    if (this.isEmpty()) return;

    const item = this._items[this._count - 1];

    return item;
  }

  length() {
    return this._count;
  }

  isEmpty() {
    return this._count === 0;
  }

  clear() {
    this._items = [];
  }
}

const s = new Stack();
s.push("john");
s.push("jane");
s.pop();
s.push("Jill");
console.log(s.peek());
