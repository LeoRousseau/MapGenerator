import { NumberMap, Point } from "../types";
import * as ElevationMap from "./elevationMap";
import { binarizeMap, getFilteredMap } from "./mapUtils";
import { createGraph, search } from "../graph-search/search";
import { getCanConnect, getGoal } from "../graph-search/borderFunctions";
import { splitMapByIslands } from "./island/extractIslands";
import * as Border from "./border";
import * as Renderer from "./drawer/renderer";
import * as Background from "./drawer/background";
import * as Path from "./drawer/path";
import { Node } from "../graph-search/node";
import { generateRivers } from "./water/rivers";
import { getCurrentConfig } from "../config";
import { ElevationLayerData } from "../config/type";
import { getColor } from "./drawer/color";

/**
 * DEBUG LINES
//Map.draw(seaLevel, step, colors[i]);
//Map.drawElevation(m, step);
//Map.drawGraph(filterPeaks(m), step, "#89F590");
 */

const step = 5;

const getScreenPos = (pos: number) => (pos + 0.5) * step;
const randomizePos = (pos: number) => pos + (Math.random() - 0.5) / 1.5; // to adjust

export function generateMap() {
  Renderer.clear();
  const dim = Renderer.getDimension();
  Background.draw(dim.width, dim.height);
  const elevationMap = ElevationMap.create(dim.width / step, dim.height / step);
  const filteredMap = getFilteredMap(elevationMap, 0.1);
  const islands = splitMapByIslands(filteredMap);
  islands.forEach((m, i) => {
    drawLayers(m, getCurrentConfig().islands.colors[i], getCurrentConfig().elevationLayer);
    drawRivers(m);
  });
}

function drawLayers(map: NumberMap, islandColor: string, elevationLayers: ElevationLayerData[]) {
  elevationLayers.forEach((data) => {
    const seaLevel = Border.get(binarizeMap(map, data.elevation));
    const points = runSearch(seaLevel);
    const color = getColor(islandColor, data.color, getCurrentConfig().islands.colorBlending);
    Path.draw(points, color, "#000000a0", data.stroke);
  });
}

function drawRivers(map: NumberMap) {
  const rivers = generateRivers(map).map((ar) =>
    ar.map((n) => {
      return { x: getScreenPos(randomizePos(n.x)), y: getScreenPos(randomizePos(n.y)) };
    })
  );
  rivers.forEach((r) => Path.draw(r, undefined, "#73B2BF"));
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
  const points = result.map((n) => {
    return { x: getScreenPos(randomizePos(n.x)), y: getScreenPos(randomizePos(n.y)) };
  });

  points.push({ x: points[0].x, y: points[0].y });
  return points;
}
