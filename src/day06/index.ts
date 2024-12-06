import run from "aocrunner";
import { occurences, uniqueBy } from "../utils/index.js";

type Coord = [number, number];
const moves: Record<string, Coord> = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
};

const directions = ["^", ">", "v", "<"];

const Marker = "#";

const guardRegEx = /<|>|v|\^/gi;

const parseInput = (rawInput: string): [string[][], Coord, number] => {
  const rows = rawInput.split("\n");

  const guardY = rows.findIndex((row) => guardRegEx.test(row));
  const guardX = rows[guardY].search(guardRegEx);

  return [
    rows.map((line) => line.split("")),
    [guardX, guardY],
    directions.indexOf(rows[guardY].charAt(guardX)),
  ];
};

const move = (loc: Coord, m: Coord): Coord => [loc[0] + m[0], loc[1] + m[1]];

const VisitSet = () => {
  let visitedSet = new Set();
  let visitedList: { pos: Coord; dirInd: number }[] = [];
  
  return {
    add: (pos: Coord, dirInd: number) => {
      visitedList.push({ pos, dirInd });
      visitedSet.add(pos.join(",") + directions[dirInd]);
    },
    has: (pos: Coord, dirInd: number) => {
      return visitedSet.has(pos.join(",") + directions[dirInd]);
    },
    uniqueVisitedPositions: () =>
      uniqueBy(visitedList, (d) => d.pos.join(",")).map((d) => d.pos),
    latestPos: () => visitedList.at(-1).pos,
    latestDir: () => visitedList.at(-1).dirInd,
  };
};

const MAX_MOVES = 50000;

const doWalk = (
  dirInd: number,
  initial: Coord,
  map: string[][],
): [string[][], Coord[], boolean] => {
  const clonedMap = map.map((d) => d.slice());

  let visited = VisitSet();
  visited.add(initial, dirInd);

  let didExit = true;

  for (let totMoves = 0; totMoves < MAX_MOVES; totMoves++) {
    const latestPos = visited.latestPos();
    const latestDir = visited.latestDir();

    // visit
    clonedMap[latestPos[1]][latestPos[0]] = "X";

    // move
    let nextSpot = move(latestPos, moves[directions[latestDir]]);
    let nextDir = latestDir;

    if (
      nextSpot[0] >= clonedMap[0].length ||
      nextSpot[0] < 0 ||
      nextSpot[1] >= clonedMap.length ||
      nextSpot[1] < 0
    ) {
      break;
    } else {
      for (let i = 0; i < directions.length - 1; i++) {
        if (clonedMap[nextSpot[1]][nextSpot[0]] === Marker) {
          nextDir = (nextDir + 1) % directions.length;
          nextSpot = move(latestPos, moves[directions[nextDir]]);
        } else {
          break;
        }
      }
    }

    if (visited.has(nextSpot, nextDir)) {
      // hit loop, revisiting same position going in same dir
      didExit = false;
      break;
    } else {
      visited.add(nextSpot, nextDir);
    }
  }

  return [clonedMap, visited.uniqueVisitedPositions(), didExit];
};

const part1 = (rawInput: string) => {
  const [map, guardPos, dirInd] = parseInput(rawInput);

  const [walkedMap] = doWalk(dirInd, guardPos, map);

  return walkedMap
    .map((row) => occurences(row.join(), "X"))
    .reduce((a, c) => a + c, 0)
    .toString();
};

const part2 = (rawInput: string) => {
  const [map, guardPos, dirInd] = parseInput(rawInput);

  const [_, positions] = doWalk(dirInd, guardPos, map);

  let obstructionLocCount = 0;
  positions.forEach((pos) => {
    const newMap = map.map((d) => d.slice());
    newMap[pos[1]][pos[0]] = Marker;
    const [_, positions, didExit] = doWalk(dirInd, guardPos, newMap);

    if (!didExit || positions.length >= MAX_MOVES) {
      obstructionLocCount++;
    }
  });

  return obstructionLocCount.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: "41",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: "6",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
