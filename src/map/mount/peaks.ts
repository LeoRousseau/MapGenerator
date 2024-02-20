import { Graph, Node, createGraph } from "../../graph-search/index";
import { NumberMap } from "../../types";

export function getPeaks(islandMap: NumberMap): Node[] {
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
