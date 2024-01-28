import { MapParameters, NumberMap, Point } from "../types";
import * as ElevationMap from "./elevationMap";
import { binarizeMap, getFilteredMap } from "./mapUtils";
import { createGraph, search } from "../graph-search/search";
import { getCanConnect, getGoal } from "../graph-search/borderFunctions";
import { splitMapByIslands } from "./island/extractIslands";
import * as Border from "./border";
import * as Renderer from "./drawer/renderer";
import * as Background from "./drawer/background";
import * as Path from "./drawer/path";
import * as Map from "./drawer/map";
import { Node } from "../graph-search/node";
import { generateRivers } from "./water/rivers";

window.addEventListener("load", (e) => {
  console.log("page is fully loaded");
  generateMap({ dimension: [1000, 1000] });
});

const colors = ["#CDCF6A", "#9AB875", "#4AD583", "#4ABCD5", "#614AD5"];
const step = 5;

const getScreenPos = (pos: number) => (pos + 0.5) * step;
const randomizePos = (pos: number) => pos + (Math.random() - 0.5) / 1.5; // to adjust

function generateMap(params: MapParameters) {
  Renderer.initialize(params.dimension[0], params.dimension[1]);
  Background.draw(params.dimension[0], params.dimension[1]);
  const elevationMap = ElevationMap.create(params.dimension[0] / step, params.dimension[0] / step);
  const filteredMap = getFilteredMap(elevationMap, 0.1);
  const islands = splitMapByIslands(filteredMap);
  islands.forEach((m, i) => {
    const seaLevel = Border.get(binarizeMap(m, 0));
    const points = runSearch(seaLevel);
    //Map.draw(seaLevel, step, colors[i]);
    Path.draw(points, colors[i], "#000000a0");
    const rivers = generateRivers(m).map((ar) =>
      ar.map((n) => {
        return { x: getScreenPos(randomizePos(n.x)), y: getScreenPos(randomizePos(n.y)) };
      })
    );
    rivers.forEach((r) => Path.draw(r, undefined, "#73B2BF"));
  });
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
