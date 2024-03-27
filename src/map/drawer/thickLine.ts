import { Point2, Point3 } from "../../types";

export function createThickLine(points: Point3[]): Point2[] {
  const lefts = [];
  const rights = [];
  for (let i = 0; i < points.length; i++) {
    const { left, right } = computeSidePoints(points[i], points[i - 1], points[i + 1]);
    lefts.push(left);
    rights.push(right);
  }
  const result = [...lefts, ...rights.reverse()];
  return result;
}

function computeSidePoints(current: Point3, prev?: Point3, next?: Point3): { left: Point2; right: Point2 } {
  let w = current.z / 2;
  let dir;
  if (prev && next) {
    const v1 = normalize(substract(current, prev));
    const v2 = normalize(substract(next, current));
    const angle = Math.acos(dot(v1, v2));
    w *= Math.max(1, angle);
    dir = add(v1, v2);
  } else {
    const v1 = prev || current;
    const v2 = next || current;
    dir = substract(v2, v1);
  }

  const ndir = normalize(dir);
  const perp = getPerpendicular(ndir);
  const p1 = add(current, scale(perp, w));
  const p2 = substract(current, scale(perp, w));
  return {
    left: p1,
    right: p2,
  };
}

function getPerpendicular(vec: Point2): Point2 {
  return { x: vec.y, y: -vec.x };
}

function normalize(vec: Point2): Point2 {
  const length = getLength(vec);
  return { x: vec.x / length, y: vec.y / length };
}

export function getLength(vec: Point2): number {
  return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
}

export function add(v1: Point2, v2: Point2) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}

export function substract(v1: Point2, v2: Point2) {
  return { x: v1.x - v2.x, y: v1.y - v2.y };
}

function scale(v1: Point2, s: number) {
  return { x: v1.x * s, y: v1.y * s };
}

function dot(v1: Point2, v2: Point2) {
  return v1.x * v2.x + v1.y * v2.y;
}
