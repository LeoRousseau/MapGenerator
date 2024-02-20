import { createGraph } from "../../graph-search/index";

describe("Testing Graph class", () => {
  const source = [
    [6.2492, -7.2293, -2.2013, -4.4305, 3.9247, -1.3259, 0.8625, 7.7328],
    [1.8862, -1, 3.3614, 7.5791, 4.7417, -7.5152, 9.8487, 8.1895],
    [4.8027, 7.7014, -5.8872, -0.4515, -1.9333, 4.9865, 4.8901, -1.3085],
    [-1.1512, -8.1728, -5.2043, -0.2694, 4.6704, -4.6677, -0.4533, 2.9914],
    [-5.7859, 7.7559, 1.6237, -1.6222, -0.7084, 3.0006, 1.6621, -0.2672],
    [-1.6161, 1.3724, -7.7542, -4.2991, -9.1901, -1.0561, -2.9162, -9.3052],
    [2.7519, 9.0128, -1.5249, 8.6944, -7.2788, -5.4158, 4.1803, -7.8775],
    [-8.9381, -4.6849, -5.2965, -0.6344, 8.0253, -3.0554, -1, 1.1047],
  ];

  const graph = createGraph(source, true);

  test("Create graph", () => {
    expect(graph.grid[0][0].cellValue).toEqual(6.2492);
    expect(graph.grid[0][0].x).toEqual(0);
    expect(graph.grid[0][1].y).toEqual(1);
    expect(graph.size_x).toEqual(8);
    expect(graph.size_y).toEqual(8);
  });

  test("Get neighbours", () => {
    expect(graph.getNeighbours(graph.grid[0][0]).length).toEqual(3);
    expect(graph.getNeighbours(graph.grid[4][4]).length).toEqual(8);
    const graph2 = createGraph(source, false);
    expect(graph2.getNeighbours(graph2.grid[4][4]).length).toEqual(4);
  });

  test("Find point", () => {
    const point = graph.findPoint((node) => node.cellValue === -1, false);
    expect(point).toStrictEqual(graph.grid[1][1]);
    const point2 = graph.findPoint((node) => node.cellValue === -1, true);
    expect(point2).toStrictEqual(graph.grid[7][6]);
  });
});
