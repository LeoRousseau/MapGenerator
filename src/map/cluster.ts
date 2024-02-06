import { Graph } from "./../graph-search/graph";
import { Node } from "./../graph-search/node";
import { createGraph, search } from "./../graph-search/search";
import { NumberMap } from "./../types";
import * as ElevationMap from "./elevationMap";

export function splitMapByClusters(elevationMap: NumberMap, maxCount: number, threshold: number): NumberMap[] {
  const result: NumberMap[] = [];
  const graph = createGraph(elevationMap, false);
  let i = 0;
  while (i < maxCount) {
    const start = graph.findPoint();
    if (start) {
      const map = extractCluster(graph, start, threshold);
      if (map) {
        i++;
        result.push(map);
      }
    } else {
      break;
    }
  }

  return result;
}

function extractMap(graph: Graph, mapToFill: NumberMap): number {
  let count = 0;
  for (let x = 0; x < graph.grid.length; x++) {
    mapToFill[x] = [];
    for (let y = 0; y < graph.grid[x].length; y++) {
      const node = graph.grid[x][y];
      if (node.hasBeenVisited) {
        count++;
        mapToFill[x][y] = node.cellValue;
        node.setValue(0);
        node.setVisited(false);
      } else {
        mapToFill[x][y] = 0;
      }
    }
  }
  return count;
}

function extractCluster(graph: Graph, start: Node, threshold: number): NumberMap | undefined {
  search(
    start,
    () => false,
    graph,
    (_from, to) => to.cellValue > threshold
  );
  const map = ElevationMap.createEmpty(graph.grid.length);
  const size = extractMap(graph, map);
  return size > 8 ? map : undefined;
}