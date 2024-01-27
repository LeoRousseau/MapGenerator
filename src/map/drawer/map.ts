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
