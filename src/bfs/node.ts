export class Node {
  private _previous: Node | null = null;

  readonly cellValue: number;
  readonly x: number;
  readonly y: number;

  _hasBeenVisited: boolean = false;

  get hasBeenVisited(): boolean {
    return this._hasBeenVisited;
  }

  get previousNode(): Node | null {
    return this._previous;
  }

  constructor(value: number, x: number, y: number) {
    this.cellValue = value;
    this.x = x;
    this.y = y;
  }

  setPrevious(prev: Node) {
    this._previous = prev;
  }

  setVisited(value: boolean) {
    this._hasBeenVisited = value;
  }

  reconstructPath(): Node[] {
    let n: Node | null = this;
    const result = [];
    if (n) result.push(n);
    while (n?.previousNode) {
      result.push(n.previousNode);
      n = n.previousNode;
    }
    return result.reverse();
  }

  toString() {
    console.log('Node ', this.x, this.y);
  }
}
