import { SVG, Svg } from "@svgdotjs/svg.js";
import { MapParameters, NumberMap } from "../types";
import * as ElevationMap from "./elevationMap";
import { binarizeMap, findBorderPoint, getBorders, getFilteredMap, splitMapByIslands } from "./mapUtils";
import { createGraph, search } from "../graph-search/bfs/search";
import { getCanConnect, getGoal } from "../graph-search/bfs/borderFunctions";
import { createPath } from "./pathSmoother";

window.addEventListener("load", (e) => {
  console.log("page is fully loaded");
  generateMap({ dimension: [1000, 1000] }, "#app");
});

let mapSVG: Svg;
const colors = ["#F1A6A6", "#E8BC23", "#4AD583", "#4ABCD5", "#614AD5"];
const step = 5;

const getScreenPos = (pos: number) => (pos + 0.5) * step;
const randomizePos = (pos: number) => pos + (Math.random() - 0.5) / 1.5; // to adjust

function generateMap(params: MapParameters, divID: string) {
  mapSVG = SVG().addTo(divID).size(params.dimension[0], params.dimension[1]);
  generateBackground(params.dimension[0], params.dimension[1]);
  const elevationMap = ElevationMap.create(params.dimension[0] / step, params.dimension[0] / step);
  const filteredMap = getFilteredMap(elevationMap, 0.1);
  const islands = splitMapByIslands(filteredMap);
  islands.forEach((m, i) => {
    const seaLevel = getBorders(binarizeMap(m, 0));
    const points = runSearch(seaLevel);
    displayElevationMap(m);
    displayPath(points, colors[i]);
  });
}

function generateBackground(width: number, height: number) {
  mapSVG.rect(width, height).fill("#CBEAEE");
}

function displayElevationMap(elevationMap: NumberMap, color = "#89F590") {
  for (let x = 0; x < elevationMap.length; x++) {
    for (let y = 0; y < elevationMap[x].length; y++) {
      if (elevationMap[x][y] > 0) {
        mapSVG
          .rect(step, step)
          .move(step * x, step * y)
          .fill(color);
      }
    }
  }
}

function runSearch(elevationMap: NumberMap): { x: number; y: number }[] {
  const graph = createGraph(elevationMap);
  const pair = findBorderPoint(elevationMap);
  const start = graph.grid[pair[0]][pair[1]];
  const end = graph.getNeighbours(start).find((n) => n.cellValue > 0);
  if (!end) return [];
  const result = search(start, getGoal(end), graph, getCanConnect(start, end));
  const points = result.map((n) => {
    return { x: getScreenPos(randomizePos(n.x)), y: getScreenPos(randomizePos(n.y)) };
  });
  return points;
}

function displayPath(points: { x: number; y: number }[], colors: string) {
  const path = createPath(points, () => {
    return Math.random() * 0.3 + 0.05;
  });
  mapSVG.path(path).fill(colors);
}
