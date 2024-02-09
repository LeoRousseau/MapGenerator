import { Point2, Point3 } from "../../types";

export function createThickLine(points: Point3[]): Point2[] {
  const lefts = [];
  const rights = [];
  for (let i = 0; i < points.length; i++) {
    const { left, right } = computeSidePoints(points[i], points[i - 1], points[i + 1]);
    console.log(left, right)
    lefts.push(left);
    rights.push(right);
  }
  const result = [...lefts, ...rights.reverse(), lefts[0]];
  return result;
}

export function computeSidePoints(current: Point3, prev?: Point3, next?:Point3): { left: Point2; right: Point2 } {
  const r = current.z / 2;
  if (!prev || !next) {
    return {
      left: {
        x: current.x,
        y: current.y + r,
      },
      right: {
        x: current.x,
        y: current.y - r,
      },
    };
  }
  console.log(current, prev, next)
  const angle = Math.atan((next.y - prev.y) / (next.x - prev.x));
  const dx = Math.sin(angle) * r;
  const dy = Math.cos(angle) * r;
  console.log(dx,dy)
  return {
    left: {
      x: current.x - dx,
      y: current.y + dy,
    },
    right: {
      x: current.x + dx,
      y: current.y - dy,
    },
  };
}

/** https://stackoverflow.com/a/43550268 */
export function refineFloat(v: number): number {
  return v + 8 - 8;
}
