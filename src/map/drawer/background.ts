import { MapID } from "./id";
import * as Renderer from "./renderer";

export function draw(width: number, height: number) {
  const bg = Renderer.getSVG().rect(width, height);
  bg.id(MapID['background'])
}
