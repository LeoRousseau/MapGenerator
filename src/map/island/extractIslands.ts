import { getCurrentConfig } from "../../config";
import { NumberMap } from "../../types";
import { splitMapByClusters } from "../cluster";

export function splitMapByIslands(elevationMap: NumberMap): NumberMap[] {
  return splitMapByClusters(elevationMap, getCurrentConfig().islands.maxCount, 0);
}
