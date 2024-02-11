import { Graph } from "./../graph-search/graph";
import { Node } from "./../graph-search/node";
import { ConnectFunction, createGraph, search } from "./../graph-search/search";
import { NumberMap } from "./../types";
import * as ElevationMap from "./elevationMap";

export function splitMapByClusters(
  elevationMap: NumberMap,
  maxCount: number,
  canConnect: ConnectFunction,
  startCondition = (n: Node) => n.cellValue > 0
): NumberMap[] {
  const result: NumberMap[] = [];
  const graph = createGraph(elevationMap, false);
  let i = 0;
  while (i < maxCount) {
    const start = graph.findPoint(startCondition);
    if (start) {
      const map = extractCluster(graph, start, canConnect);
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

export function extractMap(graph: Graph, mapToFill: NumberMap, outValue?: number, inValue?: number): number {
  let count = 0;
  for (let x = 0; x < graph.grid.length; x++) {
    mapToFill[x] = [];
    for (let y = 0; y < graph.grid[x].length; y++) {
      const node = graph.grid[x][y];
      if (node.hasBeenVisited) {
        count++;
        mapToFill[x][y] = inValue ??  node.cellValue;
        node.setValue(0);
        node.setVisited(false);
      } else {
        mapToFill[x][y] = outValue ??  node.cellValue;
      }
    }
  }
  return count;
}

function extractCluster(graph: Graph, start: Node, canConnect: ConnectFunction): NumberMap | undefined {
  search(start, () => false, graph, canConnect);
  const map = ElevationMap.createEmpty(graph.grid.length);
  const size = extractMap(graph, map, 0);
  return size > 8 ? map : undefined;
}

