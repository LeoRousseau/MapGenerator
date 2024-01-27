import { NumberMap } from "../../types";
import { Graph } from "./graph";
import { Node } from "./node";

export type successFunction = (node: Node) => boolean;
export type connectFunction = (from: Node, to: Node) => boolean;

export function search(start: Node, isGoal: successFunction, graph: Graph, canConnect: connectFunction): Node[] {
  start.setVisited(true);

  const newNodes =  graph.getNeighbours(start);
  const nodeQueue = newNodes.filter((n) => !n.hasBeenVisited && canConnect(start, n));
  nodeQueue.forEach(n => n.setPrevious(start)) 
  while (nodeQueue.length > 0) {
    const currentNode = nodeQueue.shift();
    if (!currentNode) return [];
    currentNode.setVisited(true);
    if (isGoal(currentNode)) {
      return currentNode.reconstructPath();
    } else {
      const newNodes =  graph.getNeighbours(currentNode);
      const validNodes = newNodes.filter((n) => !n.hasBeenVisited && canConnect(currentNode, n) && !nodeQueue.includes(n));
      validNodes.forEach((n) => n.setPrevious(currentNode));
      nodeQueue.push(...validNodes);
    }
  }
  return [];
}

export function createGraph(map: NumberMap, useDiagonal = true): Graph {
  const result: Node[][] = [];
  for (let x = 0; x < map.length; x++) {
    result[x] = [];
    for (let y = 0; y < map[x].length; y++) {
      result[x][y] = new Node(map[x][y], x, y);
    }
  }
  return new Graph(result, useDiagonal);
}
