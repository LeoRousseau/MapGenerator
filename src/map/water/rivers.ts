import { createGraph, search } from "../../graph-search/search";
import { NumberMap, Point2 } from "../../types";
import { Node } from "../../graph-search/node";
import { Graph } from "../../graph-search/graph";
import { getPointsFromNodes } from "../pathSmoother";
import * as Path from "../drawer/path";
import { createThickLine } from "../drawer/thickLine";

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

function createRiver(source: Point2, islandMap: NumberMap): Node[] {
  const graph = createGraph(islandMap, true);
  const start = graph.grid[source.x][source.y];
  const path = search(
    start,
    (n) => n.cellValue === 0,
    graph,
    (f, t) => f.cellValue > t.cellValue,
    (a, b) => a.cellValue - b.cellValue
  );
  //path.pop(); //TODO Define whether it's better or not
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
  rivers.filter((r) => r.length > 0).forEach((r) => createRiverPath(r));
}

function createRiverPath(points: Point2[]) {
  const points3 = points.map((p, i) => {
    const t = 1 + i / 10;
    const _t = i === points.length - 1 ? 1.5 * t : t;
    return { ...p, z: _t };
  });
  const path = createThickLine(points3); // TODO May be handle gradient to fade with ocean color (attr gradientTransform)
  Path.draw(path, "#97CBD6", undefined, undefined, false);
}
