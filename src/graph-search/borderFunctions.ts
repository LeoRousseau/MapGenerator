import { successFunction } from "./search";
import { Node } from "./node";

const minimumPathLength = 10;

const getCanConnectFn =
  (start: Node, goal: Node) =>
  (from: Node, to: Node): boolean => {
    return (to !== goal || from.reconstructPath().length > minimumPathLength) && to.cellValue > 0;
  };

const getNodeGoalFn =
  (goal: Node): successFunction =>
  (node: Node): boolean => {
    return node.x === goal.x && node.y === goal.y;
  };

export { getCanConnectFn as getCanConnect, getNodeGoalFn as getGoal };
