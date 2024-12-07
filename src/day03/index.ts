import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;



const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const mulRegEx = /mul\((\-?\d+),(\-?\d+)\)/ig

  return [...input.matchAll(mulRegEx)].map(([_, num1, num2]) => [parseInt(num1, 10), parseInt(num2, 10)])
    .reduce((a, [num1, num2]) => a + (num1 * num2), 0)
    .toString();
};

const part2 = (rawInput: string) => {
  const mulRegEx = /mul\((\-?\d+),(\-?\d+)\)|do\(\)|don\'t\(\)/ig
  const input = parseInput(rawInput);
  let active = true;
  let accum = 0;
  [...input.matchAll(mulRegEx)].forEach(match => {
    const [word, arg1, arg2] = match

    if(word === "do()") {
      active = true
    } else if (word === "don't()") {
      active = false
    } else if (active) {
      accum += parseInt(arg1, 10) * parseInt(arg2, 10)
    }
  })

  return accum.toString();
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: "161",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: "48",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
