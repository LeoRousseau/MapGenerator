import { Graph } from "../../graph-search/index";
import { NumberMap } from "../../types";
import * as Renderer from "./renderer";
import { blendColors, createFromNumber } from "./color";

export function draw(elevationMap: NumberMap, step: number, color = "#89F590a0") {
  for (let x = 0; x < elevationMap.length; x++) {
    for (let y = 0; y < elevationMap[x].length; y++) {
      if (elevationMap[x][y] > 0) {
        Renderer.getSVG()
          .rect(step, step)
          .move(step * x, step * y)
          .fill(color);
      }
    }
  }
}

type cb = (source: NumberMap, x: number, y: number, v:number) => void

export function drawElevation(elevationMap: NumberMap, step: number, color: string = "#ff0000a0",
callback?: cb) {
  for (let x = 0; x < elevationMap.length; x++) {
    for (let y = 0; y < elevationMap[x].length; y++) {
      if (elevationMap[x][y] > -1) {
        const v = elevationMap[x][y];
        const _color = blendColors(color, createFromNumber(Math.floor(v * 255)));
        Renderer.getSVG()
          .rect(step, step)
          .move(step * x, step * y)
          .fill(_color)
          .click(() => callback && callback(elevationMap, x, y, v));
      }
    }
  }
}

export function drawValue(elevationMap: NumberMap, step: number, value: number, color: string = "#ff0000") {
  for (let x = 0; x < elevationMap.length; x++) {
    for (let y = 0; y < elevationMap[x].length; y++) {
      if (elevationMap[x][y] === value) {
        Renderer.getSVG()
          .rect(step, step)
          .move(step * x, step * y)
          .fill(color);
      }
    }
  }
}

export function drawGraph(graph: Graph, step: number, color = "#89F590") {
  for (let x = 0; x < graph.grid.length; x++) {
    for (let y = 0; y < graph.grid[x].length; y++) {
      if (graph.grid[x][y].cellValue > 0) {
        Renderer.getSVG()
          .rect(step, step)
          .move(step * x, step * y)
          .fill(color);
      }
    }
  }
}
