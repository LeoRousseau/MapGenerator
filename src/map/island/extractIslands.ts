import { getCurrentConfig } from "../../config";
import { Node } from "../../graph-search/index";
import { NumberMap } from "../../types";
import { splitMapByClusters } from "../cluster";

export function splitMapByIslands(elevationMap: NumberMap): NumberMap[] {
  const canConnect = (_f: Node, t: Node) => t.cellValue > 0;
  return splitMapByClusters(elevationMap, getCurrentConfig().islands.maxCount, canConnect);
}
