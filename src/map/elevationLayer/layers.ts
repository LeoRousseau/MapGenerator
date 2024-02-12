import { getCurrentConfig } from "../../config";
import { ElevationLayerData } from "../../config/type";
import { NumberMap, Point2 } from "../../types";
import { getColor } from "../drawer/color";
import { binarizeMap, cloneMap, getFilteredMap } from "../mapUtils";
import * as Border from "../border";
import * as Path from "../drawer/path";
import { splitMapByClusters } from "../cluster";
import { createGraph, search } from "../../graph-search/search";
import { Node } from "../../graph-search/node";
import { getCanConnect, getGoal } from "../../graph-search/borderFunctions";
import { getPointsFromNodes } from "../pathSmoother";
import { Graph } from "../../graph-search/graph";
import { computeOCeanMap } from "../water/ocean";
import { drawElevation } from "../drawer/map";

type onLayerCreatedFn = (source: NumberMap) => void;

export function generateLayers(
  source: NumberMap,
  datas: ElevationLayerData[],
  islandColor: string,
  onIslandCreated: onLayerCreatedFn
) {
  computeOCeanMap(getFilteredMap(cloneMap(source), datas[0].elevation));
  //drawElevation(source, 5)
  generateLayer(source, datas, 0, islandColor, onIslandCreated);
}

function generateLayer(
  source: NumberMap,
  datas: ElevationLayerData[],
  index: number,
  islandColor: string,
  onLayerCreated?: onLayerCreatedFn
) {
  if (index >= datas.length) return;

  const data = datas[index];
  const clusters = getClustersFromMap(source, data.elevation, index === 0 ? getCurrentConfig().islands.maxCount : 5);
  clusters.forEach((cluster) => {
    const points = getPointsFromMap(cluster, data.elevation);
    const color = getColor(islandColor, data.color, getCurrentConfig().islands.colorBlending);
    Path.draw(points, color, "#000000a0", data.stroke);
    onLayerCreated && onLayerCreated(cluster);
    generateLayer(cluster, datas, index + 1, islandColor);
  });
}

function getClustersFromMap(source: NumberMap, elevation: number, limit: number): NumberMap[] {
  const filteredMap = getFilteredMap(cloneMap(source), elevation);
  const canConnect = (_f: Node, t: Node) => t.cellValue > elevation;
  return splitMapByClusters(filteredMap, limit, canConnect);
}

export function getPointsFromMap(source: NumberMap, elevation: number) {
  return runSearch(Border.get(binarizeMap(source, elevation)));
}

function runSearch(elevationMap: NumberMap): Point2[] {
  const graph = createGraph(elevationMap);
  let result = getPath(graph, false);
  if (result.length < 5) {
    // TODO : condition to define
    graph.reset();
    result = getPath(graph, true);
  }

  if (result.length === 0) {
    console.warn("No path found in graph");
    return [];
  }

  const points = getPointsFromNodes(result);
  points.push({ x: points[0].x, y: points[0].y });
  return points;
}

function getPath(graph: Graph, reverse: boolean): Node[] {
  const condition = (n: Node) => {
    return n.cellValue > 0 && graph.getNeighbours(n).length > 1;
  };

  const start = graph.findPoint(condition, reverse);
  if (!start) return [];

  const end = graph.getNeighbours(start).find((n) => n.cellValue > 0);
  if (!end) return [];

  const result = search(start, getGoal(end), graph, getCanConnect(start, end));
  return result;
}
