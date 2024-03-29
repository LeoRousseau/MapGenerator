export class Node {
  private _previous: Node | null = null;
  private _cellValue: number;

  readonly x: number;
  readonly y: number;

  _hasBeenVisited: boolean = false;

  get hasBeenVisited(): boolean {
    return this._hasBeenVisited;
  }

  get previousNode(): Node | null {
    return this._previous;
  }

  get cellValue(): number {
    return this._cellValue;
  }

  constructor(value: number, x: number, y: number) {
    this._cellValue = value;
    this.x = x;
    this.y = y;
  }

  setPrevious(prev: Node) {
    this._previous = prev;
  }

  setVisited(value: boolean) {
    this._hasBeenVisited = value;
  }

  setValue(value: number) {
    this._cellValue = value;
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
    console.log("Node ", this.x, this.y);
  }

  resetPrevious() {
    this._previous = null;
  }

  reset() {
    this._hasBeenVisited = false;
    this._previous = null;
  }
}
