import { getScreenPos, randomizePos } from "./generateMap";
import { Node } from "../graph-search/index";
import { Point2 } from "../types";

const getLineData = (from: Point2, to: Point2): { length: number; angle: number } => {
  const x_diff = to.x - from.x;
  const y_diff = to.y - from.y;

  return {
    length: Math.sqrt(Math.pow(x_diff, 2) + Math.pow(y_diff, 2)),
    angle: Math.atan2(y_diff, x_diff),
  };
};

const getControlPoint = (
  smoothness: () => number,
  current: Point2,
  previous: Point2,
  next: Point2,
  reverse: boolean
): Point2 => {
  const data = getLineData(previous || current, next || current);
  const angle = data.angle + (reverse ? Math.PI : 0);
  const length = data.length * smoothness();
  const x = current.x + Math.cos(angle) * length;
  const y = current.y + Math.sin(angle) * length;

  return { x, y };
};

const createBezier = (point: Point2, i: number, a: Point2[], smoothness: () => number): string => {
  const start = getControlPoint(smoothness, a[i - 1], a[i - 2], point, false);
  const end = getControlPoint(smoothness, point, a[i - 1], a[i + 1], true);

  return `C ${start.x},${start.y} ${end.x},${end.y} ${point.x},${point.y}`;
};

const writePath = (points: Point2[], smoothness: () => number) => {
  return points.reduce(
    (acc, point, i, a) => (i === 0 ? `M ${point.x},${point.y}` : `${acc} ${createBezier(point, i, a, smoothness)}`),
    ""
  );
};

export function createPath(points: Point2[], smoothness: () => number) {
  return writePath(points, smoothness);
}

export function getPointsFromNodes(nodes: Node[]): Point2[] {
  return nodes.map((n) => {
    return { x: getScreenPos(randomizePos(n.x)), y: getScreenPos(randomizePos(n.y)) };
  });
}
