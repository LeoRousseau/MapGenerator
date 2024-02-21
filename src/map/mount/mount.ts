import { NumberMap } from "../../types";
import { getSVG } from "../drawer/renderer";
import { getPeaks } from "./peaks";

const paths = [
  "M1 6L1.61538 4.42105L2.84615 2.28947L4 1L5.92308 1.47365L7 3.5L7.5 5L8 6",
  "M1 7L1.61538 5.42105L2.84615 3.28947L4 1L4.92308 2.65789L5.92308 4.15789L6.76923 5.57895L8 7",
  "M1 6.5L2 5L3 3L4 1L5.5 2L6.76923 4L7.5 5L8 6.5",
];

export function generateMounts(source: NumberMap, maxCount = 50) {
  const peaks = getPeaks(source);
  const sortedNodes = peaks.sort((a, b) => b.cellValue - a.cellValue).filter((n) => n.cellValue > 0.1);
  sortedNodes.length = Math.min(maxCount, sortedNodes.length);
  sortedNodes.forEach((n) => drawMount(n, 5));
}

function drawMount(node: { x: number; y: number }, step: number) {
  const path = paths[Math.floor(Math.random() * 3)]
  getSVG()
    .path(path)
    .move(step * node.x, step * node.y)
    .fill("#00000000")
    .stroke({ color: "#54552b", width: 1.5, linecap: "round", linejoin: "round" });
}
