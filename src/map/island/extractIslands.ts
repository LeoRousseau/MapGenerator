import { Graph } from "../../graph-search/bfs/graph";
import { Node } from "../../graph-search/bfs/node";
import { createGraph, search } from "../../graph-search/bfs/search";
import { NumberMap } from "../../types";
import * as ElevationMap from "../elevationMap";
import * as Border from "../border";

export function splitMapByIslands(elevationMap: NumberMap): NumberMap[] {
  const result: NumberMap[] = [];
  const graph = createGraph(elevationMap);
  let i = 0;
  while (i < 4) {
    const pair = Border.findPointOnGraph(graph);
    if (pair[0] !== 0 && pair[1] !== 0) {
      const start = graph.grid[pair[0]][pair[1]];
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
  const nodes = search(
    start,
    (node) => false,
    graph,
    (from, to) => to.cellValue > 0
  );
  const map = ElevationMap.createEmpty(graph.grid.length);
  const size = extractMap(graph, map);
  return size > 8 ? map : undefined;
}
