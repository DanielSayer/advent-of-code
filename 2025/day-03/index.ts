import { readInput, time } from "../../lib/utils";

const INPUT = await readInput("./2025/day-03/input.txt");

function partOne() {
  let total = 0;

  for (const bank of INPUT) {
    const digits = bank.split("").map(Number);

    const tensDigit = Math.max(...digits.slice(0, -1));
    const index = digits.indexOf(tensDigit);
    const onesDigit = Math.max(...digits.slice(index + 1));

    total += tensDigit * 10 + onesDigit;
  }

  return total;
}
function partTwo() {
  let total = 0;

  for (const bank of INPUT) {
    const digits = bank.split("").map(Number);
    const numDigits = digits.length;
    let joltage = "";
    let pos = 0;

    for (let selected = 0; selected < 12; selected++) {
      const remainingSelections = 12 - selected - 1;
      const maxPos = numDigits - remainingSelections - 1;

      const segment = digits.slice(pos, maxPos + 1);
      const maxIdx = pos + segment.indexOf(Math.max(...segment));

      joltage += digits[maxIdx];
      pos = maxIdx + 1;
    }

    total += Number(joltage);
  }

  return total;
}

console.log("Part 1:", time(partOne));
console.log("Part 2:", time(partTwo));
