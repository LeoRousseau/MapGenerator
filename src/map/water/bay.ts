import { NumberMap, Point2 } from "../../types";
import { splitMapByClusters } from "../cluster";
import { Node } from "../../graph-search/node";
import { cloneMap, getAveragePos } from "../mapUtils";
import { drawTextPath } from "../drawer/text";
import { add } from "../drawer/thickLine";

const distance = 10;
const diagDistance = 6;
const min = 2;

// clusturiser la carte pour chaque baie
// garder l'information de direction (direction de distance invalid)
// filtrer les clusters
// (graph search : obtenir un chemin pour la ligne de texte)
// generer le text

export function createBays(source: NumberMap) {
  const map = computeWaterIndent(source);
  const canConnect = (_f: Node, t: Node) => t.cellValue > 0;
  const clusters = splitMapByClusters(cloneMap(map), 10, canConnect);
  const data = clusters.map((c) => {
    const pos = getAveragePos(c);
    const dir = computeBayDirection(source, c);
    return { pos, dir };
  });

  data.forEach(({ pos, dir }) => {
    console.log(pos, dir)
    const text = "Hudson Bay";
    const points = [
      { x: pos.x * 5, y: pos.y * 5 },
      { x: (pos.x + dir.x * text.length *2.1) * 5, y: (pos.y + dir.y * text.length *2.1) * 5 },
    ];
    points.sort((a,b) => a.x - b.x)
    drawTextPath(points, text, "#00000090");
  });
}

export function computeWaterIndent(source: NumberMap): NumberMap {
  const result: NumberMap = [];
  for (let x = 0; x < source.length; x++) {
    result[x] = [];
    for (let y = 0; y < source[x].length; y++) {
      if (source[x][y] > 0) continue;
      const normalValues = [getRightDistance, getLeftDistance, getBottomDistance, getTopDistance].map((f) =>
        f(source, x, y)
      );
      const diagonalValues = [
        getBottomRightDistance,
        getBottomLeftDistance,
        getTopLeftDistance,
        getTopRightDistance,
      ].map((f) => f(source, x, y));
      const isValid = isInBay(normalValues) || isInBay(diagonalValues);

      result[x][y] = isValid ? 1 : 0;
    }
  }
  return result;
}

export function computeBayDirection(source: NumberMap, bay: NumberMap): Point2 {
  const result: Point2[] = [];
  for (let x = 0; x < bay.length; x++) {
    for (let y = 0; y < bay[x].length; y++) {
      if (bay[x][y] <= 0) continue;
      const dir = getBayDirection(source, x, y);
      console.log(dir)
      result.push(dir);
    }
  }
  const sum = result.reduce((acc, c) => add(acc, c), { x: 0, y: 0 });
  return { x: sum.x / result.length, y: sum.y / result.length };
}

function isInBay(values: number[]): boolean {
  const isLitoral = values.some((d) => d > 0 && d < min);
  const has3ValidDitance = values.filter((d) => d > min).length >= 3;
  return has3ValidDitance && !isLitoral;
}

function getRightDistance(source: NumberMap, x: number, y: number): number {
  for (let i = 0; i < distance; i++) {
    const step = x + i;
    if (step < source.length && source[step][y] > 0) {
      return i;
    }
  }
  return -1;
}

function getBottomRightDistance(source: NumberMap, x: number, y: number): number {
  for (let i = 0; i < diagDistance; i++) {
    const stepX = x + i;
    const stepY = y + i;
    if (stepX < source.length && stepY < source.length && source[stepX][stepY] > 0) {
      return i;
    }
  }
  return -1;
}

function getBottomDistance(source: NumberMap, x: number, y: number): number {
  for (let i = 0; i < distance; i++) {
    const step = y + i;
    if (step < source[0].length && source[x][step] > 0) {
      return i;
    }
  }
  return -1;
}

function getBottomLeftDistance(source: NumberMap, x: number, y: number): number {
  for (let i = 0; i < diagDistance; i++) {
    const stepX = x - i;
    const stepY = y + i;
    if (stepX > 0 && stepY < source.length && source[stepX][stepY] > 0) {
      return i;
    }
  }
  return -1;
}

function getLeftDistance(source: NumberMap, x: number, y: number): number {
  for (let i = 0; i < distance; i++) {
    const step = x - i;
    if (step > 0 && source[step][y] > 0) {
      return i;
    }
  }
  return -1;
}

function getTopLeftDistance(source: NumberMap, x: number, y: number): number {
  for (let i = 0; i < diagDistance; i++) {
    const stepX = x - i;
    const stepY = y - i;
    if (stepX > 0 && stepY > 0 && source[stepX][stepY] > 0) {
      return i;
    }
  }
  return -1;
}

function getTopDistance(source: NumberMap, x: number, y: number): number {
  for (let i = 0; i < distance; i++) {
    const step = y - i;
    if (step > 0 && source[x][step] > 0) {
      return i;
    }
  }
  return -1;
}

function getTopRightDistance(source: NumberMap, x: number, y: number): number {
  for (let i = 0; i < diagDistance; i++) {
    const stepX = x + i;
    const stepY = y - i;
    if (stepX < source.length && stepY > 0 && source[stepX][stepY] > 0) {
      return i;
    }
  }
  return -1;
}

function getBayDirection(source: NumberMap, x: number, y: number): Point2 {
  if (getRightDistance(source, x, y) === -1) return { x: 1, y: 0 };
  if (getTopDistance(source, x, y) === -1) return { x: 0, y: -1 };
  if (getLeftDistance(source, x, y) === -1) return { x: -1, y: 0 };
  if (getBottomDistance(source, x, y) === -1) return { x: 0, y: 1 };

  if (getBottomRightDistance(source, x, y) === -1) return { x: 1, y: 1 };
  if (getTopRightDistance(source, x, y) === -1) return { x: 1, y: -1 };
  if (getTopLeftDistance(source, x, y) === -1) return { x: -1, y: -1 };
  if (getBottomLeftDistance(source, x, y) === -1) return { x: -1, y: 1 };

  return { x: 0, y: 0 };
}
