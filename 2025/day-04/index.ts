import { readInput, time } from "../../lib/utils";

const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [1, 1],
  [1, -1],
  [-1, 0],
  [-1, 1],
  [-1, -1],
];

const RAW_INPUT = await readInput("./2025/day-04/input.txt");
const INPUT = RAW_INPUT.map((line) => line.split(""));

function isAccessible(x: number, y: number) {
  const line = INPUT[x];
  const char = line[y];

  if (char !== "@") {
    return false;
  }

  let adjacentTP = 0;
  for (const dir of dirs) {
    const [dx, dy] = dir;
    const newX = x + dx;
    const newY = y + dy;

    if (newX < 0 || newX >= INPUT.length || newY < 0 || newY >= line.length) {
      continue;
    }

    if (INPUT[newX][newY] === "@") {
      adjacentTP++;
      if (adjacentTP >= 4) return false;
    }
  }

  return true;
}

function getAccessibleTP() {
  let accessibleTP = 0;

  for (let i = 0; i < INPUT.length; i++) {
    for (let j = 0; j < INPUT[i].length; j++) {
      if (isAccessible(i, j)) {
        accessibleTP++;
      }
    }
  }

  return accessibleTP;
}

function removeAccessibleTP() {
  const tpToRemove = [];

  for (let i = 0; i < INPUT.length; i++) {
    for (let j = 0; j < INPUT[i].length; j++) {
      if (isAccessible(i, j)) {
        tpToRemove.push([i, j]);
      }
    }
  }

  for (const [x, y] of tpToRemove) {
    INPUT[x][y] = ".";
  }

  return tpToRemove.length;
}

function partTwo() {
  let count = 0;
  let removed;

  while ((removed = removeAccessibleTP()) > 0) {
    count += removed;
  }

  return count;
}

const partOne = getAccessibleTP;

time("Part 1", partOne);
time("Part 2", partTwo);
