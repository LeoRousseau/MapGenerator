import { Point2 } from "../../types";
import { createPath } from "../pathSmoother";
import * as Renderer from "./renderer";

export function draw(points: Point2[], fillColor?: string, strokeColor?: string, strokeWidth = 3, randomize = true) {
  let path: string;
  if (randomize) {
     path = createPath(points, () => {
      return Math.random() * 0.3 + 0.05;
    });
  }
  else {
    path = createPath(points, () => {
      return 0.15;
    });
  }

  const pathSVG = Renderer.getSVG().path(path);
  pathSVG.fill(fillColor ? fillColor : "#00000000");
  if (strokeColor) pathSVG.stroke({ color: strokeColor, width: strokeWidth });
}
