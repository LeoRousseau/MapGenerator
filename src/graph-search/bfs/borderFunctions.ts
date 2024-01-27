import { successFunction } from "./search";
import { Node } from "./node";

const getCanConnectFn =
  (start: Node, goal: Node) =>
  (from: Node, to: Node): boolean => {
    return (from !== start || to !== goal) && to._cellValue > 0;
  };

const getNodeGoalFn =
  (goal: Node): successFunction =>
  (node: Node): boolean => {
    return node.x === goal.x && node.y === goal.y;
  };

export { getCanConnectFn as getCanConnect, getNodeGoalFn as getGoal };
