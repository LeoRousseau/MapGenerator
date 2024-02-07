import { Graph } from "../../graph-search/graph";
import { NumberMap } from "../../types";
import * as Renderer from "./renderer";
import { blendColors, createFromNumber } from "./color";

export function draw(elevationMap: NumberMap, step: number, color = "#89F590") {
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

export function drawElevation(elevationMap: NumberMap, step: number, color: string = "#ff0000") {
  for (let x = 0; x < elevationMap.length; x++) {
    for (let y = 0; y < elevationMap[x].length; y++) {
      if (elevationMap[x][y] > 0) {
        const v = elevationMap[x][y];
        const _color = blendColors(color, createFromNumber(Math.floor(v*255)));
        Renderer.getSVG()
          .rect(step, step)
          .move(step * x, step * y)
          .fill(_color);
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
