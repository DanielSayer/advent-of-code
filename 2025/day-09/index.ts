import { readInput, time } from "../../lib/utils";

const RAW_INPUT = await readInput("./2025/day-09/input.txt");
const INPUT = RAW_INPUT.map((line) => line.split(",")).map(([x, y]) => ({
  x: Number(x),
  y: Number(y),
}));

function partOne() {
  let maxArea = 0;

  for (let i = 0; i < INPUT.length; i++) {
    const { x, y } = INPUT[i];

    for (let j = i + 1; j < INPUT.length; j++) {
      const { x: x2, y: y2 } = INPUT[j];

      const dx = Math.abs(x - x2 + 1);
      const dy = Math.abs(y - y2 + 1);

      const area = dx * dy;
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  return maxArea;
}

type Point = { x: number; y: number };
type Edge = { p1: Point; p2: Point };

const vertices = INPUT;
const n = vertices.length;

const edges: Edge[] = [];
for (let i = 0; i < n; i++) {
  edges.push({ p1: vertices[i], p2: vertices[(i + 1) % n] });
}

function buildBoundarySet(): Set<string> {
  const boundary = new Set<string>();

  for (const { p1, p2 } of edges) {
    if (p1.x === p2.x) {
      const minY = Math.min(p1.y, p2.y);
      const maxY = Math.max(p1.y, p2.y);
      for (let y = minY; y <= maxY; y++) {
        boundary.add(`${p1.x},${y}`);
      }
    } else {
      const minX = Math.min(p1.x, p2.x);
      const maxX = Math.max(p1.x, p2.x);
      for (let x = minX; x <= maxX; x++) {
        boundary.add(`${x},${p1.y}`);
      }
    }
  }

  return boundary;
}

function isInsideOrOnBoundary(
  px: number,
  py: number,
  boundary: Set<string>
): boolean {
  if (boundary.has(`${px},${py}`)) return true;

  // Ray casting: count vertical edge crossings to the right
  let count = 0;
  for (const { p1, p2 } of edges) {
    if (p1.x === p2.x) {
      const edgeX = p1.x;
      const minY = Math.min(p1.y, p2.y);
      const maxY = Math.max(p1.y, p2.y);

      // Half-open interval [minY, maxY) to avoid double-counting vertices
      if (edgeX > px && py >= minY && py < maxY) {
        count++;
      }
    }
  }

  return count % 2 === 1;
}

function isRectangleInside(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  boundary: Set<string>
): boolean {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);

  if (!isInsideOrOnBoundary(minX, minY, boundary)) return false;
  if (!isInsideOrOnBoundary(maxX, minY, boundary)) return false;
  if (!isInsideOrOnBoundary(minX, maxY, boundary)) return false;
  if (!isInsideOrOnBoundary(maxX, maxY, boundary)) return false;

  for (const { p1, p2 } of edges) {
    if (p1.x === p2.x) {
      const ex = p1.x;
      const edgeMinY = Math.min(p1.y, p2.y);
      const edgeMaxY = Math.max(p1.y, p2.y);

      if (ex > minX && ex < maxX && edgeMaxY > minY && edgeMinY < maxY) {
        return false;
      }
    } else {
      const ey = p1.y;
      const edgeMinX = Math.min(p1.x, p2.x);
      const edgeMaxX = Math.max(p1.x, p2.x);

      if (ey > minY && ey < maxY && edgeMaxX > minX && edgeMinX < maxX) {
        return false;
      }
    }
  }

  return true;
}

function partTwo() {
  const boundary = buildBoundarySet();
  let maxArea = 0;

  for (let i = 0; i < n; i++) {
    const { x: x1, y: y1 } = vertices[i];

    for (let j = i + 1; j < n; j++) {
      const { x: x2, y: y2 } = vertices[j];

      const width = Math.abs(x2 - x1) + 1;
      const height = Math.abs(y2 - y1) + 1;
      const area = width * height;

      if (area > maxArea && isRectangleInside(x1, y1, x2, y2, boundary)) {
        maxArea = area;
      }
    }
  }

  return maxArea;
}

time("Part 1", partOne);
time("Part 2", partTwo);
