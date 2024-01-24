import { SVG, Svg } from "@svgdotjs/svg.js";
import { MapParameters, NumberMap } from "../types";
import * as ElevationMap from "./elevationMap";
import { findBorderPoint, getBorders, getFilteredMap } from "./mapUtils";
import { createGraph, search } from "../bfs/search";
import { getCanConnect, getGoal } from "../bfs/borderFunctions";
import { createPath } from "./pathSmoother";

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  generateMap({ dimension: [1000, 1000] }, "#app");
});

let mapSVG: Svg;
const step = 5;

function generateMap(params: MapParameters, divID: string) {
  mapSVG = SVG().addTo(divID).size(params.dimension[0], params.dimension[1]);
  generateBackground(params.dimension[0], params.dimension[1]);
  const elevationMap = ElevationMap.create(params.dimension[0] / step, params.dimension[0] / step);
  const seaLevel = getBorders(getFilteredMap(elevationMap, 0.1));
  //displayElevationMap(seaLevel);
  setTimeout(() => {
    runSearch(seaLevel);
  }, 1);
}

function generateBackground(width: number, height: number) {
  mapSVG.rect(width, height).fill("#CBEAEE");
}

function displayElevationMap(elevationMap: NumberMap) {
  for (let x = 0; x < elevationMap.length; x++) {
    for (let y = 0; y < elevationMap[x].length; y++) {
      mapSVG
        .rect(step, step)
        .move(step * x, step * y)
        .fill(elevationMap[x][y] > 0 ? "#89F590" : "#FFFFFF00");
    }
  }
}

function runSearch(elevationMap: NumberMap) {
  const graph = createGraph(elevationMap);
  const pair = findBorderPoint(elevationMap);
  const start = graph.grid[pair[0]][pair[1]];
  const end = graph.getNeighbours(start).find((n) => n.cellValue > 0);
  if (!end) return;
  const result = search(start, getGoal(end), graph, getCanConnect(start, end));
  if (!result) return;
  const points = result.map((n) => [n.x * step, n.y * step] as [number, number]);
  const path = createPath(points, () => {
    return Math.random() * 0.3 + 0.05;
  });
  mapSVG.path(path).fill("#f06");
}
