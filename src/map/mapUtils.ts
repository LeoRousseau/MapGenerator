import { Graph } from "../graph-search/bfs/graph";
import { createGraph, search } from "../graph-search/bfs/search";
import { NumberMap } from "../types";
import { Node } from "../graph-search/bfs/node";

export function getFilteredMap(elevationMap: NumberMap, threshold: number): NumberMap {
  let result: NumberMap = [];
  for (let x = 0; x < elevationMap.length; x++) {
    result[x] = [];
    for (let y = 0; y < elevationMap[x].length; y++) {
      result[x][y] = elevationMap[x][y] > threshold ? elevationMap[x][y] : 0;
    }
  }

  return result;
}

export function binarizeMap(elevationMap: NumberMap, threshold: number) {
  let result: NumberMap = [];
  for (let x = 0; x < elevationMap.length; x++) {
    result[x] = [];
    for (let y = 0; y < elevationMap[x].length; y++) {
      result[x][y] = elevationMap[x][y] > threshold ? 1 : 0;
    }
  }

  return result;
}

export function getBorders(entryMap: NumberMap): NumberMap {
  let result: NumberMap = [];
  for (let x = 0; x < entryMap.length; x++) {
    result[x] = [];
    for (let y = 0; y < entryMap[x].length; y++) {
      if (entryMap[x][y] && getProximitySum(entryMap, x, y) > 3) {
        result[x][y] = 0;
      } else {
        result[x][y] = entryMap[x][y];
      }
    }
  }

  return result;
}

function getProximitySum(entryMap: NumberMap, x: number, y: number) {
  return entryMap[x + 1][y] + entryMap[x - 1][y] + entryMap[x][y + 1] + entryMap[x][y - 1];
}

export function findBorderPoint(elevationMap: NumberMap): number[] {
  for (let x = 0; x < elevationMap.length; x++) {
    for (let y = 0; y < elevationMap[x].length; y++) {
      if (elevationMap[x][y] > 0) {
        return [x, y];
      }
    }
  }
  return [0, 0];
}

export function findBorderPointOnGraph(graph: Graph): number[] {
  for (let x = 0; x < graph.grid.length; x++) {
    for (let y = 0; y < graph.grid[x].length; y++) {
      if (graph.grid[x][y].cellValue > 0) {
        return [x, y];
      }
    }
  }
  return [0, 0];
}

export function splitMapByIslands(elevationMap: NumberMap): NumberMap[] {
  const result: NumberMap[] = [];
  const graph = createGraph(elevationMap);
  let i = 0;
  while (i < 4) {
    const pair = findBorderPointOnGraph(graph);
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

export function extractIsland(graph: Graph, start: Node): NumberMap | undefined {
  const nodes = search(
    start,
    (node) => false,
    graph,
    (from, to) => to.cellValue > 0
  );
  const map = createEmptyMap(graph.grid.length);
  const size = extractMap(graph, map);
  return size > 8 ? map : undefined;
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

function createEmptyMap(size: number): NumberMap {
  let result: NumberMap = [];
  for (let x = 0; x < size; x++) {
    result[x] = [];
    for (let y = 0; y < size; y++) {
      result[x][y] = 0;
    }
  }
  return result;
}
