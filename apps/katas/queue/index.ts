export class Queue {
  private _items: any[] = [];
  private _count: number = 0;

  constructor() {}
  enqueue(item: any) {
    this._items.unshift(item);
    this._count++;

    return item;
  }

  dequeue(): any {
    if (this.isEmpty()) return;

    const item = this._items.pop();
    this._count--;

    return item;
  }

  peek(): any {
    if (this.isEmpty()) return;

    const item = this._items[0];

    return item;
  }

  isEmpty() {
    return this._count === 0;
  }

  length() {
    return this._count;
  }
}

const q = new Queue();
q.enqueue("john");
q.enqueue("jane");
q.enqueue("jess");
console.log(q.dequeue());
