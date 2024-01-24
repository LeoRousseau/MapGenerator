type Point = [number, number];

const line = (pointA: Point, pointB: Point): { length: number; angle: number } => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
};

const getControlPoint = (
  smoothness: () => number,
  current: Point,
  previous: Point,
  next: Point,
  reverse: boolean
): Point => {
  // Replace 'previous' and 'next' with 'current'
  // if they don't exist
  // (when 'current' is the first or last point of the array)
  const p = previous || current;
  const n = next || current;

  // properties of the line between previous and next
  const l = line(p, n);

  // If is end-control-point, add PI to the angle to go backward
  const angle = l.angle + (reverse ? Math.PI : 0);
  const length = l.length * smoothness();

  // The control point position is relative to the current point
  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;

  return [x, y];
};

const createBezier = (point: Point, i: number, a: Point[], smoothness: () => number): string => {
  // start control point
  const [cpsX, cpsY] = getControlPoint(smoothness, a[i - 1], a[i - 2], point, false);
  // end control point
  const [cpeX, cpeY] = getControlPoint(smoothness, point, a[i - 1], a[i + 1], true);

  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
};

const writePath = (points: Point[], smoothness: () => number) => {
  return points.reduce(
    (acc, point, i, a) => (i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${createBezier(point, i, a, smoothness)}`),
    ""
  );
};

export function createPath(points: Point[], smoothness: () => number) {
  return writePath(points, smoothness);
}
