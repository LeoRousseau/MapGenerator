import { getCurrentConfig } from "../../config";
import { ElevationLayerData } from "../../config/type";
import { NumberMap, Point } from "../../types";
import { getColor } from "../drawer/color";
import { binarizeMap, cloneMap, getFilteredMap } from "../mapUtils";
import * as Border from "../border";
import * as Path from "../drawer/path";
import { splitMapByClusters } from "../cluster";
import { createGraph, search } from "../../graph-search/search";
import { Node } from "../../graph-search/node";
import { getCanConnect, getGoal } from "../../graph-search/borderFunctions";
import { getPointsFromNodes } from "../pathSmoother";

export function generateLayers(source: NumberMap, datas: ElevationLayerData[], islandColor: string) {
  generateLayer(source, datas, 0, islandColor);
}

function generateLayer(source: NumberMap, datas: ElevationLayerData[], index: number, islandColor: string) {
  if (index >= datas.length) return;

  const data = datas[index];
  const clusters = getClustersFromMap(source, data.elevation, index === 0 ? getCurrentConfig().islands.maxCount : 5);
  clusters.forEach((cluster) => {
    const points = getPointsFromMap(cluster, data.elevation);
    const color = getColor(islandColor, data.color, getCurrentConfig().islands.colorBlending);
    Path.draw(points, color, "#000000a0", data.stroke);
    generateLayer(cluster, datas, index + 1, islandColor);
  });
}

function getClustersFromMap(source: NumberMap, elevation: number, limit: number): NumberMap[] {
  const filteredMap = getFilteredMap(cloneMap(source), elevation);
  return splitMapByClusters(filteredMap, limit, elevation);
}

function getPointsFromMap(source: NumberMap, elevation: number) {
  return runSearch(Border.get(binarizeMap(source, elevation)));
}

function runSearch(elevationMap: NumberMap): Point[] {
  const graph = createGraph(elevationMap);
  const condition = (n: Node) => {
    return graph.getNeighbours(n).length > 1;
  };

  const start = graph.findPoint(condition);
  if (!start) return [];

  const end = graph.getNeighbours(start).find((n) => n.cellValue > 0);
  if (!end) return [];

  const result = search(start, getGoal(end), graph, getCanConnect(start, end));
  const points = getPointsFromNodes(result);

  points.push({ x: points[0].x, y: points[0].y });
  return points;
}


