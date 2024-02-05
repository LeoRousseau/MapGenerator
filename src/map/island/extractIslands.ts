import { getCurrentConfig } from "../../config";
import { Graph } from "../../graph-search/graph";
import { Node } from "../../graph-search/node";
import { createGraph, search } from "../../graph-search/search";
import { NumberMap } from "../../types";
import * as ElevationMap from "../elevationMap";

export function splitMapByIslands(elevationMap: NumberMap): NumberMap[] {
  const result: NumberMap[] = [];
  const graph = createGraph(elevationMap, false);
  let i = 0;
  while (i < getCurrentConfig().islands.maxCount) {
    console.log(i)
    const start = graph.findPoint();
    if (start) {
      const map = extractIsland(graph, start);
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

function extractIsland(graph: Graph, start: Node): NumberMap | undefined {
  search(
    start,
    () => false,
    graph,
    (_from, to) => to.cellValue > 0
  );
  const map = ElevationMap.createEmpty(graph.grid.length);
  const size = extractMap(graph, map);
  return size > 8 ? map : undefined;
}
