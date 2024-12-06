import run from "aocrunner";
import { dropLast, dropNth, range, zip } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput.split("\n").map((line) => line.split(" ").map(Number));

const isSorted = row => (row.every(d => d > 0) || row.every(d => d < 0)) 
const isInBounds = row => row.every(d => Math.abs(d) < 4 && Math.abs(d) > 0)

const pairDiffs = (row: number[]): number[] => dropLast(zip(row, row.slice(1))).map(([a, b]) => b - a);

const computeVariants = (row: number[]) => range(row.length).map(i => dropNth(row, i))

type BoolFn = <T>(input: T) => boolean
const and = (fn1: BoolFn, fn2: BoolFn): BoolFn => input => fn1(input) && fn2(input)

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  
  return input 
    .map(pairDiffs)
    .filter(isSorted)
    .filter(isInBounds)
    .length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input 
    .map(row => [row, ...computeVariants(row)])
    .map(row => row.map(pairDiffs))
    .filter(row => row.some(and(isInBounds, isSorted)))
    .length
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
