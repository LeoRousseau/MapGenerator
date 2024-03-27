import { Point2 } from "../../types";
import { getSVG } from "./renderer";

export function drawSimpleTitle(position: Point2, content: string, color: string) {
  const lines = content.split(" ");

  const text1 = getSVG().text(lines[0]);
  text1.move(position.x, position.y).font({ fill: color, size: 101, family: "Whisper" });
  const text2 = getSVG().text(lines[1]);
  text2.move(position.x + 50, position.y + 70).font({ fill: color, size: 64, family: "Whisper" });
}

export function drawSimpleText(position: Point2, content: string, color: string) {
  const text1 = getSVG().text(content);
  text1.move(position.x, position.y).font({ fill: color, size: 25, family: "Whisper" });
}

export function drawTextPath(points: Point2[], content: string, color: string) {
  const path = points.map((p, i) => {
    const _x = Math.round(p.x)
    const _y = Math.round(p.y)
    if (i === 0) return `M ${_x} ${_y}`;
    else if (i === 1) return `L ${_x} ${_y}`;
    else return `${_x} ${_y}`;
  });

  const data = path.join(' ');
  console.log(data)
  const text1 = getSVG().textPath(content, data);
  text1.font({ fill: color, size: 25, family: "Whisper" });
}
