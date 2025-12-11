import { time, readInput } from "../../lib/utils";

type Node = {
  name: string;
  connections: string[];
};

const RAW_INPUT = await readInput("./2025/day-11/input.txt");
const INPUT = RAW_INPUT.map((line) => {
  const [name, connections] = line.split(": ");
  return {
    name,
    connections: connections.split(" ").map((x) => x.trim()),
  };
});
INPUT.push({ name: "out", connections: [] });

function partOne() {
  const startNode = INPUT.find((n) => n.name === "you")!;
  const goalNode = INPUT.find((n) => n.name === "out")!;

  const memo = new Map<string, number>();
  return dfs(startNode, goalNode, memo);
}

function partTwo() {
  const startNode = INPUT.find((n) => n.name === "ssr")!;
  const mandatoryVisitedNode = INPUT.find((n) => n.name === "dac")!;
  const mandatoryVisitedNode2 = INPUT.find((n) => n.name === "fft")!;
  const goalNode = INPUT.find((n) => n.name === "out")!;
}

function dfs(current: Node, goal: Node, memo: Map<string, number>) {
  if (current.name === goal.name) {
    return 1;
  }

  if (memo.has(current.name)) {
    return memo.get(current.name)!;
  }

  let paths = 0;
  for (const connection of current.connections) {
    const nextNode = INPUT.find((n) => n.name === connection)!;
    paths += dfs(nextNode, goal, memo);
  }

  memo.set(current.name, paths);
  return paths;
}

time("Part 1", partOne);
