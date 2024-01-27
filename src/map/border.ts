import { Graph } from "../graph-search/bfs/graph";
import { NumberMap } from "../types";

export function get(entryMap: NumberMap): NumberMap {
    let result: NumberMap = [];
    for (let x = 0; x < entryMap.length; x++) {
      result[x] = [];
      for (let y = 0; y < entryMap[x].length; y++) {
        if (entryMap[x][y] && getProximitySum(entryMap, x, y) > 3) {
          result[x][y] = 0;
        } else {
          result[x][y] = entryMap[x][y];
        }
      }
    }
  
    return result;
  }
  
  function getProximitySum(entryMap: NumberMap, x: number, y: number) {
    return entryMap[x + 1][y] + entryMap[x - 1][y] + entryMap[x][y + 1] + entryMap[x][y - 1];
  }
  
  export function findPoint(elevationMap: NumberMap): number[] {
    for (let x = 0; x < elevationMap.length; x++) {
      for (let y = 0; y < elevationMap[x].length; y++) {
        if (elevationMap[x][y] > 0) {
          return [x, y];
        }
      }
    }
    return [0, 0];
  }
  
  export function findPointOnGraph(graph: Graph): number[] {
    for (let x = 0; x < graph.grid.length; x++) {
      for (let y = 0; y < graph.grid[x].length; y++) {
        if (graph.grid[x][y].cellValue > 0) {
          return [x, y];
        }
      }
    }
    return [0, 0];
  }
  
  