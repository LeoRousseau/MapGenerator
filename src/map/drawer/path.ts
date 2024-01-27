import { Point } from "../../types";
import { createPath } from "../pathSmoother";
import * as Renderer from "./renderer";

export function draw(points: Point[], fillColor?: string, strokeColor?: string) {
  const path = createPath(points, () => {
    return Math.random() * 0.3 + 0.05;
  });
  const pathSVG = Renderer.getSVG().path(path);
  pathSVG.fill(fillColor ? fillColor : "#00000000");
  if (strokeColor) pathSVG.stroke({ color: strokeColor, width: 4 });
}
