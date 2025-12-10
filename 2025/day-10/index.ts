import { readInput, time } from "../../lib/utils";

type SwitchState = 1 | 0;

type Machine = {
  switches: SwitchState[];
  buttons: number[][];
  joltages: number[];
};

const RAW_INPUT = await readInput("./2025/day-10/input.txt");
const INPUT: Machine[] = RAW_INPUT.map((line) => {
  const endOfLights = line.indexOf("]");
  const lights = line
    .slice(1, endOfLights)
    .split("")
    .map((x) => (x === "#" ? 1 : 0));

  const joltageStart = line.indexOf("{", endOfLights);
  const joltages = line
    .slice(joltageStart + 1, -1)
    .split(",")
    .map(Number);

  const buttons = [...line.matchAll(/\(([^)]+)\)/g)].map((match) =>
    match[1].split(",").map(Number)
  );

  return {
    switches: lights,
    buttons: buttons,
    joltages: joltages,
  };
});

function solvePart1(machine: Machine): number {
  const { switches: target, buttons } = machine;
  const numLights = target.length;
  const numButtons = buttons.length;

  let minPresses = Infinity;

  for (let mask = 0; mask < 1 << numButtons; mask++) {
    const state = Array(numLights).fill(0);

    for (let b = 0; b < numButtons; b++) {
      if (mask & (1 << b)) {
        for (const lightIdx of buttons[b]) {
          if (lightIdx < numLights) {
            state[lightIdx] ^= 1;
          }
        }
      }
    }

    const matches = state.every((v, i) => v === target[i]);
    if (matches) {
      const presses = popcount(mask);
      minPresses = Math.min(minPresses, presses);
    }
  }

  return minPresses;
}

function popcount(n: number): number {
  let count = 0;
  while (n) {
    count += n & 1;
    n >>>= 1;
  }
  return count;
}

const part1 = INPUT.reduce((sum, m) => sum + solvePart1(m), 0);

time("Part 1", () => part1);
