import { Point } from "../../types";
import { createPath } from "../pathSmoother";
import * as Renderer from './renderer'

export function draw(points: Point[], color: string) {
    const path = createPath(points, () => {
        return Math.random() * 0.3 + 0.05;
      });
      Renderer.getSVG().path(path).fill(color);
}