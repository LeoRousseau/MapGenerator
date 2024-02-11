import { SuccessFunction, ConnectFunction } from "./search";
import { Node } from "./node";

const minimumPathLength = 10;

const getCanConnectFn =
  (_start: Node, goal: Node): ConnectFunction =>
  (from: Node, to: Node): boolean => {
    return (to !== goal || from.reconstructPath().length > minimumPathLength) && to.cellValue > 0;
  };

const getNodeGoalFn =
  (goal: Node): SuccessFunction =>
  (node: Node): boolean => {
    return node.x === goal.x && node.y === goal.y;
  };

export { getCanConnectFn as getCanConnect, getNodeGoalFn as getGoal };
