import { createGraph, search } from "../../graph-search/search";
import { NumberMap } from "../../types";
import { Node } from "../../graph-search/node";
import { createEmpty } from "../elevationMap";
import { extractMap } from "../cluster";

let oceanMap: NumberMap | undefined = undefined;

export function computeOCeanMap(source: NumberMap) {
  const graph = createGraph(source);
  const start = graph.grid[0][0];
  const canConnect = (_f: Node, t: Node) => t.cellValue === 0;
  search(start, () => false, graph, canConnect);
  const map = createEmpty(graph.grid.length);
  extractMap(graph, map, 0, 1);
  oceanMap = map;
}

export function getOceanMap(): NumberMap {
  if (!oceanMap) throw new Error('Ocean map not generated');
  return oceanMap;
}
