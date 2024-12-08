import run from "aocrunner";
import { range, sum } from "../utils/index.js";

const parseInput = (
  rawInput: string,
): [[number, number[]][], number, number] => {
  const list: [number, number[]][] = rawInput.split("\n").map((line) => {
    const [answer, args] = line.split(":");
    const nums = args
      .trim()
      .split(" ")
      .map((d) => parseInt(d, 10));
    return [parseInt(answer, 10), nums];
  });

  const lengths = list.map((d) => d[1].length - 1);
  const max = Math.max(...lengths);
  const min = Math.min(...lengths);

  return [list, max, min];
};

const combinations = <T>(options: T[], size: number): T[][] => {
  let result: T[][] = [];

  if (size === 0) return [[]];

  for (let i = 0; i < options.length; i++) {
    const subCombinations = combinations(options, size - 1);
    for (const subCombo of subCombinations) {
      result.push([options[i], ...subCombo]);
    }
  }

  return result;
};

const opFns: Record<string, (a: number, b: number) => number> = {
  "+": (a, b) => a + b,
  "*": (a, b) => a * b,
  "||": (a, b) => parseInt(`${a}${b}`, 10),
};

const solve =
  (combos: Record<string, string[][]>) =>
  ([answer, nums]: [answer: number, nums: number[]]) => {
    const ops = combos[nums.length - 1];
    for (let i = 0; i < ops.length; i++) {
      let [result, ...rest] = nums;
      result = rest.reduce((a, c, j) => opFns[ops[i][j]](a, c), result);
      if (result === answer) {
        return answer;
      }
    }
    return 0;
  };

const part1 = (rawInput: string) => {
  const [input, max, min] = parseInput(rawInput);

  const operators = ["+", "*"];
  const combos = range(min, max + 1).reduce(
    (a, c) => ({ [c]: combinations(operators, c), ...a }),
    {},
  );

  return input
    .map(solve(combos))
    .reduce(sum, 0)
    .toString();
};

const part2 = (rawInput: string) => {
  const [input, max, min] = parseInput(rawInput);

  const operators = ["+", "*", "||"];
  const combos = range(min, max + 1).reduce(
    (a, c) => ({ [c]: combinations(operators, c), ...a }),
    {},
  );

  return input
    .map(solve(combos))
    .reduce(sum, 0)
    .toString();
};

run({
  part1: {
    tests: [
      {
        input: `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: "3749",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: "11387",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
