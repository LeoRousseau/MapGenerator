import { NumberMap, Point2 } from "../types";

export function getFilteredMap(elevationMap: NumberMap, threshold: number): NumberMap {
  const result: NumberMap = [];
  for (let x = 0; x < elevationMap.length; x++) {
    result[x] = [];
    for (let y = 0; y < elevationMap[x].length; y++) {
      result[x][y] = elevationMap[x][y] > threshold ? elevationMap[x][y] : 0;
    }
  }

  return result;
}

export function binarizeMap(elevationMap: NumberMap, threshold: number) {
  const result: NumberMap = [];
  for (let x = 0; x < elevationMap.length; x++) {
    result[x] = [];
    for (let y = 0; y < elevationMap[x].length; y++) {
      result[x][y] = elevationMap[x][y] > threshold ? 1 : 0;
    }
  }

  return result;
}

export function cloneMap(source: NumberMap): NumberMap {
  return Array.from(source, (row) => [...row]);
}

export function getAveragePos(source: NumberMap): Point2 {
  const result: Point2 = { x: 0, y: 0 };
  let count = 0;
  for (let x = 0; x < source.length; x++) {
    for (let y = 0; y < source[x].length; y++) {
      const cell = source[x][y];
      if (cell) {
        result.x+=x;
        result.y+=y;
        count++;
      }
    }
  }
  result.x/=count;
  result.y/=count;
  return result;
}

