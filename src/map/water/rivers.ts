import { createGraph, search, Node, Graph } from "../../graph-search/index";
import { NumberMap, Point2 } from "../../types";
import { getPointsFromNodes } from "../pathSmoother";
import * as Path from "../drawer/path";
import { createThickLine, getLength, substract } from "../drawer/thickLine";
import { getOceanMap } from "./ocean";
import { getPointsFromMap } from "../elevationLayer/layers";
import { createEmpty } from "../elevationMap";
import { getPeaks } from "../mount/peaks";

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
  graph.resetPrevious();
  const startNode = graph.grid[start.x][start.y];

  const result = createRiver(start, graph);
  if (result.length === 0) {
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

    let nodes = graph.getNeighbours(lastNode);
    const visitedNodes: Node[] = [];

    while (nodes.length > 0) {
      nodes = nodes.filter((n) => n.cellValue < startNode.cellValue);
      nodes.sort((a: Node, b: Node) => a.cellValue - b.cellValue);

      const first = nodes.shift();

      if (!first || visitedNodes.includes(first)) continue;
      visitedNodes.push(first);
      const valid = generateSegment(graph, first, stack);
      if (valid) {
        stack.unshift(result);
        return true;
      } else {
        const neighbours = graph.getNeighbours(first);
        nodes.push(...neighbours);
      }
    }
    return false;
  }
}

export function drawRivers(map: NumberMap) {
  const riverDatas = generateRivers(map, 5);
  computeLakes(riverDatas);

  riverDatas.forEach((data) => {
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
  const map = createEmpty(graph.grid.length, -1);
  for (let x = 0; x < graph.grid.length; x++) {
    for (let y = 0; y < graph.grid[x].length; y++) {
      const node = graph.grid[x][y];
      if (node.hasBeenVisited) {
        map[x][y] = node.cellValue;
      }
    }
  }

  const points = getPointsFromMap(map, 0);
  Path.draw(points, "#97CBD6");
}
