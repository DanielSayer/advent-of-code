import { readInput, time } from "../../lib/utils";

type Node = {
  x: number;
  y: number;
  z: number;
};

const RAW_INPUT = await readInput("./2025/day-08/input.txt");
const INPUT: Node[] = RAW_INPUT.map((line) => line.split(",")).map(
  ([x, y, z]) => ({
    x: Number(x),
    y: Number(y),
    z: Number(z),
  })
);

function squareDistance(a: Node, b: Node) {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
}

function getSortedPaths() {
  const paths: { from: Node; to: Node; distance: number }[] = [];
  for (let i = 0; i < INPUT.length; i++) {
    for (let j = i + 1; j < INPUT.length; j++) {
      paths.push({
        from: INPUT[i],
        to: INPUT[j],
        distance: squareDistance(INPUT[i], INPUT[j]),
      });
    }
  }
  return paths.sort((a, b) => a.distance - b.distance);
}

class DisjointSetUnion {
  private parent: Map<Node, Node>;
  private size: Map<Node, number>;
  private numComponents: number;

  constructor(nodes: Node[]) {
    this.parent = new Map();
    this.size = new Map();
    this.numComponents = nodes.length;
    for (const node of nodes) {
      this.parent.set(node, node);
      this.size.set(node, 1);
    }
  }

  find(x: Node): Node {
    const parent = this.parent.get(x);
    if (parent !== x) {
      const root = this.find(parent!);
      this.parent.set(x, root);
    }
    return this.parent.get(x)!;
  }

  union(x: Node, y: Node): void {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return;

    if (this.size.get(rootX)! < this.size.get(rootY)!) {
      this.parent.set(rootX, rootY);
      this.size.set(rootY, this.size.get(rootY)! + this.size.get(rootX)!);
    } else {
      this.parent.set(rootY, rootX);
      this.size.set(rootX, this.size.get(rootX)! + this.size.get(rootY)!);
    }

    this.numComponents--;
  }

  getSize(x: Node): number {
    return this.size.get(this.find(x))!;
  }

  getNumComponents(): number {
    return this.numComponents;
  }
}

function partOne() {
  const sortedPaths = getSortedPaths();

  const dsu = new DisjointSetUnion(INPUT);
  for (let k = 0; k < Math.min(1000, sortedPaths.length); k++) {
    const path = sortedPaths[k];
    dsu.union(path.from, path.to);
  }

  const circuitSizes = new Map<Node, number>();
  for (const node of INPUT) {
    const root = dsu.find(node);
    circuitSizes.set(root, dsu.getSize(node));
  }

  const sizes = Array.from(circuitSizes.values()).sort((a, b) => b - a);
  return sizes[0] * sizes[1] * sizes[2];
}

function partTwo() {
  const sortedPaths = getSortedPaths();

  const dsu = new DisjointSetUnion(INPUT);

  for (const path of sortedPaths) {
    if (dsu.find(path.from) !== dsu.find(path.to)) {
      if (dsu.getNumComponents() === 2) {
        return path.from.x * path.to.x;
      }
      dsu.union(path.from, path.to);
    }
  }

  throw new Error("Graph not connected - no single circuit formed");
}

time("Part 1", partOne);
time("Part 2", partTwo);
