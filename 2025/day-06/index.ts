import { readInput, time } from "../../lib/utils";

const INPUT = await readInput("./2025/day-06/example.txt");

function partOne() {
  const matrix = INPUT.map((line) =>
    line.replace(/ +/g, " ").trim().split(" ")
  );
  const maxCols = matrix[0].length;

  const transposed: string[][] = Array(maxCols)
    .fill(null)
    .map((_, i) => matrix.map((row) => row[i]));

  return transposed.reduce((total, group) => {
    const operator = group[group.length - 1];
    const numbers = group.slice(0, -1).map(Number);

    const result = numbers.reduce((acc, num) =>
      operator === "*" ? acc * num : acc + num
    );
    return total + result;
  }, 0);
}

type MathProblem = {
  numbers: number[];
  operator: string;
};

function partTwo() {
  const width = Math.max(...INPUT.map((l) => l.length));

  const isSeparator = Array(width)
    .fill(null)
    .map((_, col) => INPUT.every((line) => line[col] === " "));

  const problems: MathProblem[] = [];
  let currentProblem: MathProblem = {
    numbers: [],
    operator: "",
  };

  for (let col = width - 1; col >= 0; col--) {
    if (isSeparator[col]) {
      if (currentProblem.numbers.length > 0) {
        problems.push(currentProblem);
        currentProblem = { numbers: [], operator: "" };
      }
    } else {
      const digits = INPUT.slice(0, -1)
        .map((line) => line[col])
        .join("")
        .trim();

      if (digits) {
        currentProblem.numbers.push(parseInt(digits));
      }
      currentProblem.operator = INPUT[INPUT.length - 1][col];
    }
  }
  if (currentProblem.numbers.length > 0) problems.push(currentProblem);

  return problems.reduce((total, { numbers, operator }) => {
    const result = numbers.reduce((acc, num) =>
      operator === "*" ? acc * num : acc + num
    );
    return total + result;
  }, 0);
}

time("Part 1", partOne);
time("Part 2", partTwo);
