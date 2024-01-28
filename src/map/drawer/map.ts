import { Color } from "@svgdotjs/svg.js";
import { Graph } from "../../graph-search/graph";
import { NumberMap } from "../../types";
import * as Renderer from "./renderer";

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

export function drawElevation(elevationMap: NumberMap, step: number) {
  for (let x = 0; x < elevationMap.length; x++) {
    for (let y = 0; y < elevationMap[x].length; y++) {
      if (elevationMap[x][y] > 0) {
        const v = elevationMap[x][y];
        Renderer.getSVG()
          .rect(step, step)
          .move(step * x, step * y)
          .fill(new Color(v * 255,v * 255,v * 255));
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
