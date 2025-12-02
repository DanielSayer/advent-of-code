import { time } from "../../lib/utils";

const RAW_INPUT = await Bun.file("./2025/day-02/input.txt").text();
const INPUT = RAW_INPUT.split(",");

function partOne() {
  return INPUT.reduce((acc, line) => {
    const [start, end] = line.split("-").map(Number);

    for (let i = start; i <= end; i++) {
      const num = i.toString();
      if (num.length % 2 === 1) continue;

      const halfway = num.length / 2;
      const first = num.slice(0, halfway);
      const second = num.slice(halfway);

      if (first === second) {
        acc += i;
      }
    }

    return acc;
  }, 0);
}

function partTwo() {
  return INPUT.reduce((acc, line) => {
    const [start, end] = line.split("-").map(Number);
    const factorsMap = new Map<number, number[]>();

    for (let i = start; i <= end; i++) {
      const num = i.toString();
      const length = num.length;

      let factors = [];
      if (factorsMap.has(length)) {
        factors = factorsMap.get(length)!;
      } else {
        factors = [...Array(length + 1).keys()].filter(
          (index) => length % index === 0
        );
        factorsMap.set(length, factors);
      }

      for (const factor of factors) {
        if (factor * 2 > length) continue;
        let isHit = true;
        let idx = factor;
        let prev = num.slice(0, factor);

        while (idx < length) {
          const next = num.slice(idx, idx + factor);
          if (prev !== next) {
            isHit = false;
            break;
          }
          idx += factor;
          prev = next;
        }

        if (isHit) {
          acc += i;
          break;
        }
      }
    }

    return acc;
  }, 0);
}

console.log("Part 1:", time(partOne));
console.log("Part 2:", time(partTwo));

export {};
