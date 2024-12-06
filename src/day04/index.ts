import run from "aocrunner";
import { isBetween } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput.split("\n").map((d) => d.split(""));

type Coord = [number, number];
const directions: Coord[] = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
];

const checker = (targetWord: string, mat: string[][]) => {
  const check = ([x, y]: Coord, [x1, y1]: Coord, targetIndex: number) => {
    if (targetIndex === targetWord.length) {
      return true;
    } else if (
      isBetween(y, 0, mat.length) &&
      isBetween(x, 0, mat[y].length) &&
      mat[y][x] === targetWord[targetIndex]
    ) {
      return check([x + x1, y + y1], [x1, y1], targetIndex + 1);
    } else {
      return false;
    }
  };

  return check;
};

const part1 = (rawInput: string) => {
  const mat = parseInput(rawInput);

  const check = checker("XMAS", mat);

  let count = 0;

  mat.forEach((row, y) => {
    row.forEach((_, x) => {
      directions.forEach(([x1, y1]) => {
        if (check([x, y], [x1, y1], 0)) {
          count++;
        }
      });
    });
  });

  return count.toString();
};

const part2 = (rawInput: string) => {
  const mat = parseInput(rawInput);

  const checkMAS = checker("MAS", mat);
  const checkSAM = checker("SAM", mat);

  let count = 0;

  mat.forEach((row, y) => {
    row.forEach((_, x) => {
      if (checkMAS([x, y], [1, 1], 0) || checkSAM([x, y], [1, 1], 0)) {
        if (checkMAS([x + 2, y], [-1, 1], 0) || checkSAM([x + 2, y], [-1, 1], 0)) {
          count++;
        }
      }
    });
  });

  return count.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: "18",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: "9",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
