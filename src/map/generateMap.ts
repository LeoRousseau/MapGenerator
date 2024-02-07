import * as ElevationMap from "./elevationMap";
import { getFilteredMap } from "./mapUtils";
import { splitMapByIslands } from "./island/extractIslands";
import * as Renderer from "./drawer/renderer";
import * as Background from "./drawer/background";
import { drawRivers } from "./water/rivers";
import { getCurrentConfig } from "../config";
import { generateLayers } from "./elevationLayer/layers";

/**
 * DEBUG LINES
//Map.draw(seaLevel, step, colors[i]);
//Map.drawElevation(m, step);
//Map.drawGraph(filterPeaks(m), step, "#89F590");
 */

const step = 5;

export const getScreenPos = (pos: number) => (pos + 0.5) * step;
export const randomizePos = (pos: number) => pos + (Math.random() - 0.5) / 1.5; // to adjust

export function generateMap() {
  Renderer.clear();
  const dim = Renderer.getDimension();
  Background.draw(dim.width, dim.height);
  const elevationMap = ElevationMap.create(dim.width / step, dim.height / step);
  const filteredMap = getFilteredMap(elevationMap, 0); // previous value 0.1
  const islands = splitMapByIslands(filteredMap);
  islands.forEach((m, i) => {
    generateLayers(m, getCurrentConfig().elevationLayer, getCurrentConfig().islands.colors[i]);
    drawRivers(m);
  });
}


