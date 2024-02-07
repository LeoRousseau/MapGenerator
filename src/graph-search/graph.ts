import { Node } from "./node";

const defaultOffsets = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const diagonalOffsets = [
  [-1, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
];

export class Graph {
  readonly size_x: number;
  readonly size_y: number;

  readonly grid: Node[][];
  readonly useDiagonal: boolean = false;

  constructor(grid: Node[][], useDiagonal = false) {
    this.size_x = grid.length;
    this.size_y = grid[0].length;
    this.grid = grid;
    this.useDiagonal = useDiagonal;
  }

  getNeighbours(node: Node): Node[] {
    const x = node.x;
    const y = node.y;
    const offsets = this.useDiagonal ? [...diagonalOffsets, ...defaultOffsets] : defaultOffsets;
    const coords = offsets.map((o) => [x + o[0], y + o[1]]);
    const validCoord = coords.filter((c) => c[0] < this.size_x && c[0] >= 0 && c[1] < this.size_y && c[1] >= 0);
    return validCoord.map((c) => this.grid[c[0]][c[1]]);
  }

  hasNonVisitedNode(): boolean {
    return this.grid.flat().some((n) => !n.hasBeenVisited);
  }

  findPoint(condition: (node: Node) => boolean = () => true): Node | undefined {
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        if (this.grid[x][y].cellValue > 0 && condition(this.grid[x][y])) {
          return this.grid[x][y];
        }
      }
    }
    return undefined;
  }
}
