import * as ElevationMap from "./elevationMap";
import * as Renderer from "./drawer/renderer";
import * as Background from "./drawer/background";
import { drawRivers } from "./water/rivers";
import { getCurrentConfig } from "../config";
import { generateLayers } from "./elevationLayer/layers";
import { NumberMap } from "../types";
import { drawSimpleText } from "./drawer/text";
import { getIslandName } from "./name-generator/generate";
import { generateMounts } from "./mount/mount";

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
  const islands: NumberMap[] = [];
  generateLayers(elevationMap, getCurrentConfig().elevationLayer, getCurrentConfig().islands.colors[0], (source) => {
    islands.push(source);
  });
  islands.forEach((source) => {
    drawRivers(source);
    generateMounts(source);
  });

  drawSimpleText({ x: 50, y: 100 }, getIslandName(islands.length > 0), "#00000090");
}
