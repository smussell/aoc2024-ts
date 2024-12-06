import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const matrix = rawInput.split('\n').map(d => d.split(''));
  return matrix
}

type Coord = [number, number]
const directions: Coord[] = [
  [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]
]

const isBetween = (n: number, a: number, b: number) => n >= a && n < b;

const check = ([x, y]: Coord, [x1, y1]: Coord, targetIndex:  number, targetWord: string, mat: string[][]): boolean => {
  if (targetIndex === targetWord.length) {
    return true;
  } else if (isBetween(y, 0, mat.length) && isBetween(x, 0, mat[y].length) && mat[y][x] === targetWord[targetIndex]) {
    return check([x + x1, y + y1], [x1, y1], targetIndex + 1, targetWord, mat,)
  } else {
    return false
  }
}

const part1 = (rawInput: string) => {
  const mat = parseInput(rawInput);

  let count = 0;
  mat.forEach((row, y) => {
    row.forEach((col, x) => {
      directions.forEach(([x1, y1]) => {
        if (check([x, y], [x1, y1], 0, 'XMAS', mat)) {
          count++
        }
      })
    })
  })

  return count.toString();
};

const part2 = (rawInput: string) => {
  const mat = parseInput(rawInput);

  let count = 0;
  mat.forEach((row, y) => {
    row.forEach((col, x) => {
      
      if (check([x, y], [1, 1], 0, 'MAS', mat) || check([x, y], [1, 1], 0, 'SAM', mat)) {
        if (check([x + 2, y], [-1, 1], 0, 'MAS', mat) || check([x + 2, y], [-1, 1], 0, 'SAM', mat)) {
          count++
        }
      }
    
    })
  })

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
