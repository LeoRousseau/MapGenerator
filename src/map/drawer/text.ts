import { Point2 } from "../../types";
import { getSVG } from "./renderer";

export function drawSimpleText(position: Point2, content: string, color: string) {
  const lines = content.split(" ");

  const text1 = getSVG().text(lines[0]);
  text1.move(position.x, position.y).font({ fill: color, size: 101, family: "Whisper" });
  const text2 = getSVG().text(lines[1]);
  text2.move(position.x + 50, position.y + 70).font({ fill: color, size: 64, family: "Whisper" });
}
