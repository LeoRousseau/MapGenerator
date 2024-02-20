import { NumberMap } from "../../types";
import { getSVG } from "../drawer/renderer";
import { getPeaks } from "./peaks";

export function generateMounts(source: NumberMap, maxCount = 20) {
  const peaks = getPeaks(source);
  const sortedNodes = peaks.sort((a, b) => b.cellValue - a.cellValue).filter((n) => n.cellValue > 0.3);
  sortedNodes.length = Math.min(maxCount, sortedNodes.length);
  sortedNodes.forEach((n) => drawMount(n, 5));
}

function drawMount(node: { x: number; y: number }, step: number) {
  getSVG()
    .path("M1 7L1.61538 5.42105L2.84615 3.28947L4 1L4.92308 2.65789L5.92308 4.15789L6.76923 5.57895L8 7")
    .move(step * node.x, step * node.y)
    .fill("#00000000")
    .stroke({ color: "#54552b", width: 1.5, linecap: "round", linejoin: "round" });
}
