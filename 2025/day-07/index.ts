import { readInput, time } from "../../lib/utils";

const INPUT = await readInput("./2025/day-07/input.txt");

type BeamState = Map<number, number>;

function processRow(beams: BeamState, row: string) {
  const newBeams = new Map<number, number>();
  let splits = 0;

  for (let col = 0; col < row.length; col++) {
    if (!beams.has(col)) continue;

    const weight = beams.get(col)!;
    const char = row[col];

    if (char === ".") {
      newBeams.set(col, (newBeams.get(col) ?? 0) + weight);
    } else if (char === "^") {
      splits++;
      if (col > 0) {
        newBeams.set(col - 1, (newBeams.get(col - 1) ?? 0) + weight);
      }
      if (col < row.length - 1) {
        newBeams.set(col + 1, (newBeams.get(col + 1) ?? 0) + weight);
      }
    }
  }

  return { beams: newBeams, splits };
}

function partOne() {
  const startCol = INPUT[0].indexOf("S");
  let beams: BeamState = new Map([[startCol, 0]]);
  let totalSplits = 0;

  for (let row = 1; row < INPUT.length; row++) {
    const { beams: newBeams, splits } = processRow(beams, INPUT[row]);
    beams = newBeams;
    totalSplits += splits;
  }

  return totalSplits;
}

function partTwo() {
  const startCol = INPUT[0].indexOf("S");
  let beams: BeamState = new Map([[startCol, 1]]);

  for (let row = 1; row < INPUT.length; row++) {
    const { beams: newBeams } = processRow(beams, INPUT[row]);
    beams = newBeams;
  }

  return Array.from(beams.values()).reduce((a, b) => a + b, 0);
}

time("Part 1", partOne);
time("Part 2", partTwo);
