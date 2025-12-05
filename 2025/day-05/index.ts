import { readInput, time } from "../../lib/utils";

const _INPUT = await readInput("./2025/day-05/input.txt");

const VALID_RANGES = _INPUT
  .filter((line) => line.includes("-"))
  .map((x) => x.split("-").map(Number));

const STOCK = _INPUT
  .filter((line) => !line.includes("-") && line !== "")
  .map(Number);

function partOne() {
  let freshStockCount = 0;

  for (const stockId of STOCK) {
    for (const [start, end] of VALID_RANGES) {
      if (start <= stockId && stockId <= end) {
        freshStockCount++;
        break;
      }
    }
  }

  return freshStockCount;
}

function partTwo() {
  const sorted = [...VALID_RANGES].sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });

  const merged: [number, number][] = [];
  for (const [start, end] of sorted) {
    if (merged.length === 0) {
      merged.push([start, end]);
      continue;
    }

    const lastIndex = merged.length - 1;
    const [lastStart, lastEnd] = merged[lastIndex];
    if (start <= lastEnd + 1) {
      merged[lastIndex] = [lastStart, Math.max(lastEnd, end)];
    } else {
      merged.push([start, end]);
    }
  }

  return merged.reduce((acc, [start, end]) => acc + end - start + 1, 0);
}

console.log("Part 1:", time(partOne));
console.log("Part 2:", time(partTwo));
