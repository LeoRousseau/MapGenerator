import * as ElevationMap from "./elevationMap";
import * as Renderer from "./drawer/renderer";
import * as Background from "./drawer/background";
import { drawRivers } from "./water/rivers";
import { getCurrentConfig } from "../config";
import { generateLayers } from "./elevationLayer/layers";
import { NumberMap } from "../types";
import { drawSimpleTitle } from "./drawer/text";
import { getIslandName } from "./name-generator/generate";
import { generateMounts } from "./mount/mount";
import { applyStyleToMap } from "./drawer/style";
import { computeWaterIndent, createBays } from "./water/bay";
import { draw, drawElevation } from "./drawer/map";

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
  generateLayers(elevationMap, getCurrentConfig().elevationLayer, (source) => {
    islands.push(source);
  });
  islands.forEach((source) => {
    //const result = computeWaterIndent(source);
    //drawElevation(source, 5, "#ff0000a0", testPX)
    createBays(source);
    //draw(result, 5)
    //drawRivers(source);
    //generateMounts(source);
  });

  //drawSimpleTitle({ x: 50, y: 100 }, getIslandName(islands.length > 0), "#00000090");

  applyStyleToMap();
}
