import { mod, readInput } from "../../lib/utils";

const INPUT = await readInput("./2025/day-01/input.txt");

function partOne() {
  let currentPosition = 50;
  let numZeros = 0;

  INPUT.forEach((element) => {
    const direction = element.slice(0, 1);
    const distance = Number(element.slice(1));
    const dir = direction === "L" ? -1 : 1;
    currentPosition = mod(currentPosition + dir * distance, 100);
    if (currentPosition === 0) {
      numZeros++;
    }
  });

  return numZeros;
}

function isOutOfBounds(position: number) {
  return position < 0 || position > 99;
}

function partTwo() {
  let currentPosition = 50;
  let numZeros = 0;

  INPUT.forEach((element) => {
    const direction = element.slice(0, 1);
    const distance = Number(element.slice(1));
    const dir = direction === "L" ? -1 : 1;

    const fullRotations = Math.floor(distance / 100);
    const remainder = distance % 100;

    let newPosition = currentPosition + dir * remainder;
    if (isOutOfBounds(newPosition)) {
      if (mod(newPosition, 100) !== 0 && currentPosition !== 0) {
        numZeros++;
      }
      newPosition = mod(newPosition, 100);
    }

    numZeros += fullRotations;
    if (currentPosition === 0) {
      numZeros++;
    }

    currentPosition = newPosition;
  });

  return numZeros;
}

console.log("Part 1:", partOne());
console.log("Part 2:", partTwo());

export {};
