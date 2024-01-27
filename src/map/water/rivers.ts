import { createGraph, search } from "../../graph-search/bfs/search";
import { NumberMap, Point } from "../../types";
import { Node } from "../../graph-search/bfs/node";

function generateSource(islandMap: NumberMap): Point[] {
  const result = [];
  while (result.length < 3) {
    const x = Math.round(Math.random() * (islandMap.length - 1));
    const y = Math.round(Math.random() * (islandMap[0].length - 1));
    if (islandMap[x][y] > 0.1) {
      result.push({ x, y });
    }
  }

  return result;
}

function createRiver(source: Point, islandMap: NumberMap): Node[] {
  const graph = createGraph(islandMap, true);
  const start = graph.grid[source.x][source.y];
  const path = search(
    start,
    (n) => n.cellValue === 0,
    graph,
    (f, t) => f.cellValue > t.cellValue,
    (a,b) => a.cellValue - b.cellValue,
  );
  path.pop();
  return path;
}

export function generateRivers(islandMap: NumberMap): Point[][] {
  const sources = generateSource(islandMap);
  return sources.map((v) =>
    createRiver(v, islandMap).map((n) => {
      return { x: n.x, y: n.y };
    })
  );
}
