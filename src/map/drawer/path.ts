import { Point2 } from "../../types";
import { createPath } from "../pathSmoother";
import * as Renderer from "./renderer";

export function draw(points: Point2[], randomize = true, id="default") {
  let path: string;
  if (randomize) {
    path = createPath(points, () => {
      return Math.random() * 0.3 + 0.05;
    });
  } else {
    path = createPath(points, () => {
      return 0.15;
    });
  }

  const pathSVG = Renderer.getSVG().path(path);
  pathSVG.id(id);
}
