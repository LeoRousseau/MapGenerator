import { Node } from "../../graph-search/index";

describe("Testing Node class", () => {
  const node0 = new Node(1, 0, 0);
  const node1 = new Node(2, 0, 1);
  const node2 = new Node(3, 1, 0);

  test("Create nodes", () => {
    expect(node0.x).toEqual(0);
    expect(node0.y).toEqual(0);
    expect(node1.x).toEqual(0);
    expect(node1.y).toEqual(1);
    expect(node2.x).toEqual(1);
    expect(node2.y).toEqual(0);
  });

  test("Construct path", () => {
    node2.setPrevious(node1);
    node1.setPrevious(node0);
    expect(node2.reconstructPath()).toStrictEqual([node0, node1, node2]);
    node1.resetPrevious();
    expect(node2.reconstructPath()).toStrictEqual([node1, node2]);
  });
});
