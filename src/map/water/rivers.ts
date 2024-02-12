import { createGraph, search } from "../../graph-search/search";
import { NumberMap, Point2 } from "../../types";
import { Node } from "../../graph-search/node";
import { Graph } from "../../graph-search/graph";
import { getPointsFromNodes } from "../pathSmoother";
import * as Path from "../drawer/path";
import { createThickLine, getLength, substract } from "../drawer/thickLine";
import { getOceanMap } from "./ocean";
import { getSVG } from "../drawer/renderer";
import { extractCluster } from "../cluster";
import { getPointsFromMap } from "../elevationLayer/layers";
import { createEmpty } from "../elevationMap";
import { drawElevation, drawValue } from "../drawer/map";

type Segment = Node[];

type LakeData = {
  position: Point2;
  depth: number;
};

type RiverData = {
  segments: Segment[];
  lakes: LakeData[];
};

export function createRiverSystem(source: NumberMap, start: Point2): RiverData {
  const result: RiverData = {
    segments: [],
    lakes: [],
  };
  const graph = createGraph(source, true);
  generateSegment(graph, start, result.segments);
  return result;
}

function generateSegment(graph: Graph, start: Point2, stack: Segment[]): boolean {
  const result = createRiver(start, graph);
  if (result.length === 0) {
    console.log("failed");
    return false;
  }
  const ocean = getOceanMap();
  const lastNode = result[result.length - 1];
  if (ocean[lastNode.x][lastNode.y] > 0) {
    stack.push(result);
    return true;
  } else {
    if (result.length < 2) {
      return false;
    }
    stack.push(result);
    const nodes = graph.getNeighbours(lastNode);
    const visitedNodes: Node[] = [];
    while (nodes.length > 0) {
      // ! Need to understand why it's broken sometimes
      nodes.sort((a: Node, b: Node) => a.cellValue - b.cellValue);
      const first = nodes.shift();

      if (!first || visitedNodes.includes(first)) continue;
      visitedNodes.push(first);
      const valid = generateSegment(graph, first, stack);
      if (valid) {
        return true;
      } else {
        const neighbours = graph.getNeighbours(first);
        nodes.push(...neighbours);
      }
    }
    return true;
  }
}

export function drawRivers(map: NumberMap) {
  const riverDatas = generateRivers(map, 5);
  computeLakes(riverDatas);

  console.log(riverDatas);
  riverDatas.forEach((data) => {
    data.segments.forEach((seg) => {
      if (seg.length === 0) return;
      //   const color =
      //     "rgb(" +
      //     Math.round(Math.random() * 255) +
      //     "," +
      //     Math.round(Math.random() * 255) +
      //     "," +
      //     Math.round(Math.random() * 255) +
      //     ")";
      //   seg.forEach((s) => {
      //     getSVG()
      //       .rect(5, 5)
      //       .move(5 * s.x, 5 * s.y)
      //       .fill(color);
      //   });
    });

    const a: Segment = [];
    const conc = a.concat(...data.segments);
    const points = getPointsFromNodes(conc);
    data.lakes.forEach((lake) => createLakeShape(map, lake));
    createRiverPath(points);
  });
}

function computeLakes(datas: RiverData[]) {
  datas.forEach((data) => {
    data.segments.forEach((seg, i) => {
      if (i < data.segments.length - 1) {
        const current = seg[seg.length - 1];
        const next = data.segments[i + 1][0];
        const distance = getLength(substract(current, next));
        if (distance > 2) {
          data.lakes.push({
            position: current,
            depth: next.cellValue - current.cellValue,
          });
        }
      }
    });
  });
}

function generateRivers(islandMap: NumberMap, maxNumber = 5): RiverData[] {
  const sources = getPeaks(islandMap)
    .sort(() => Math.random() - 0.5)
    .slice(0, maxNumber);
  return sources.map((v) => createRiverSystem(islandMap, v));
}

function getPeaks(islandMap: NumberMap): Node[] {
  const graph = filterPeaks(islandMap);
  const peaks = graph.grid.flat().filter((v) => v.cellValue > 0);
  return peaks;
}

export function filterPeaks(islandMap: NumberMap, threshold = 0.2): Graph {
  const graph = createGraph(islandMap, true);
  const result = createGraph(islandMap, true);
  for (let x = 0; x < graph.grid.length; x++) {
    for (let y = 0; y < graph.grid[x].length; y++) {
      const node = graph.grid[x][y];
      const neighbours = graph.getNeighbours(node);
      const isNotLocal = neighbours.some((n) => n.cellValue > node.cellValue);
      if (isNotLocal || node.cellValue < threshold) result.grid[node.x][node.y].setValue(0);
    }
  }
  return result;
}

function createRiver(source: Point2, graph: Graph): Node[] {
  const start = graph.grid[source.x][source.y];
  const isGoal = (n: Node) => {
    return !graph.getNeighbours(n).some((e) => e.cellValue < n.cellValue);
  };
  const path = search(
    start,
    isGoal,
    graph,
    (f, t) => f.cellValue >= t.cellValue,
    (a, b) => a.cellValue - b.cellValue
  );
  //path.pop(); //TODO Define whether it's better or not
  return path;
}

function createRiverPath(points: Point2[], color = "#97CBD6") {
  const points3 = points.map((p, i) => {
    const t = 1 + i / 10;
    const _t = i === points.length - 1 ? 1.5 * t : t;
    return { ...p, z: _t };
  });
  const path = createThickLine(points3); // TODO May be handle gradient to fade with ocean color (attr gradientTransform)
  Path.draw(path, color, undefined, undefined, false);
}

function createLakeShape(source: NumberMap, data: LakeData) {
  const graph = createGraph(source);
  const start = graph.grid[data.position.x][data.position.y];
  const canConnect = (_f: Node, t: Node) => {
    const depthIsValid = t.cellValue - start.cellValue < data.depth;
    const isOcean = getOceanMap()[t.x][t.y] > 0;
    return depthIsValid && !isOcean;
  };

  search(start, () => false, graph, canConnect);
  const map = createEmpty(graph.grid.length);
  for (let x = 0; x < graph.grid.length; x++) {
    for (let y = 0; y < graph.grid[x].length; y++) {
      const node = graph.grid[x][y];
      if (node.hasBeenVisited) {
        map[x][y] = 1;
      }
    }
  }

  //drawValue(map, 5, 1, "#ff0000a0");
  const points = getPointsFromMap(map, 0);
  Path.draw(points, "#97CBD6");
  // getSVG()
  //   .rect(5, 5)
  //   .move(5 * start.x, 5 * start.y)
  //   .fill("#00000");
}
