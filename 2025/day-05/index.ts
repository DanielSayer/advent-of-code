import { readInput, time } from "../../lib/utils";

const _INPUT = await readInput("./2025/day-05/input.txt");

const VALID_RANGES = _INPUT
  .filter((line) => line.includes("-"))
  .map((x) => {
    const [start, end] = x.split("-").map(Number);
    return { start, end };
  })
  .sort((a, b) => a.start - b.start);

const STOCK = _INPUT
  .filter((line) => !line.includes("-") && line !== "")
  .map(Number);

function partOne() {
  let freshStockCount = 0;

  for (const stockId of STOCK) {
    for (const { start, end } of VALID_RANGES) {
      if (start <= stockId && stockId <= end) {
        freshStockCount++;
        break;
      }
    }
  }

  return freshStockCount;
}

function partTwo() {
  const merged: { start: number; end: number }[] = [];
  for (const { start, end } of VALID_RANGES) {
    if (merged.length === 0) {
      merged.push({ start, end });
      continue;
    }

    const lastIndex = merged.length - 1;
    const { start: lastStart, end: lastEnd } = merged[lastIndex];
    if (start <= lastEnd + 1) {
      merged[lastIndex] = { start: lastStart, end: Math.max(lastEnd, end) };
    } else {
      merged.push({ start, end });
    }
  }

  return merged.reduce((acc, { start, end }) => acc + end - start + 1, 0);
}

time("Part 1", partOne);
time("Part 2", partTwo);
