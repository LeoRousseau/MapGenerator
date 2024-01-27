import { NumberMap } from "../types";

export function getFilteredMap(elevationMap: NumberMap, threshold: number): NumberMap {
  let result: NumberMap = [];
  for (let x = 0; x < elevationMap.length; x++) {
    result[x] = [];
    for (let y = 0; y < elevationMap[x].length; y++) {
      result[x][y] = elevationMap[x][y] > threshold ? elevationMap[x][y] : 0;
    }
  }

  return result;
}

export function binarizeMap(elevationMap: NumberMap, threshold: number) {
  let result: NumberMap = [];
  for (let x = 0; x < elevationMap.length; x++) {
    result[x] = [];
    for (let y = 0; y < elevationMap[x].length; y++) {
      result[x][y] = elevationMap[x][y] > threshold ? 1 : 0;
    }
  }

  return result;
}
