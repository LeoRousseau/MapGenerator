import { createGraph, search } from "../../graph-search/search";
import { NumberMap, Point } from "../../types";
import { Node } from "../../graph-search/node";
import { Graph } from "../../graph-search/graph";
import { getPointsFromNodes } from "../pathSmoother";
import * as Path from "../drawer/path";

function getPeaks(islandMap: NumberMap): Node[] {
  const graph = filterPeaks(islandMap);
  const peaks = graph.grid.flat().filter((v) => v.cellValue > 0);
  return peaks;
}

export function filterPeaks(islandMap: NumberMap, threshold = 0.2): Graph {
  const graph = createGraph(islandMap, true);
  const result = createGraph(islandMap, true);
  for (let x = 0; x < graph.grid.length; x++) {
    for (let y = 0; y < graph.grid[x].length; y++) {
      const node = graph.grid[x][y];
      const neighbours = graph.getNeighbours(node);
      const isNotLocal = neighbours.some((n) => n.cellValue > node.cellValue);
      if (isNotLocal || node.cellValue < threshold) result.grid[node.x][node.y].setValue(0);
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
    (a, b) => a.cellValue - b.cellValue
  );
  path.pop();
  return path;
}

function generateRivers(islandMap: NumberMap, maxNumber = 5): Node[][] {
  const sources = getPeaks(islandMap)
    .sort(() => Math.random() - 0.5)
    .slice(0, maxNumber);
  return sources.map((v) => createRiver(v, islandMap));
}

export function drawRivers(map: NumberMap) {
  const rivers = generateRivers(map).map((ar) => getPointsFromNodes(ar));
  rivers.forEach((r) => Path.draw(r, undefined, "#73B2BF"));
}
