import run from "aocrunner";

const parseInput = (rawInput: string): [string[][], string[][]] => {
  const [ruleStrings, orderStrings] = rawInput.split("\n\n");

  return [
    ruleStrings.split("\n").map((d) => d.split("|")),
    orderStrings.split("\n").map((d) => d.split(",")),
  ];
};

const ruleSort =
  (rules: string[][]) =>
  (a: string, b: string): number => {
    const rule = rules.find((rule) => rule.includes(a) && rule.includes(b));
    
    if (rule) {
      return rule[0] === a ? -1 : 1;
    } else {
      return 0;
    }
  };

const part1 = (rawInput: string) => {
  const [rules, pages] = parseInput(rawInput);

  return pages
    .map((pages) => pages.slice().sort(ruleSort(rules)))
    .filter((page, i) => page.join(",") === pages[i].join(","))
    .map((page) => page[Math.floor(page.length / 2)])
    .reduce((a, c) => a + parseInt(c, 10), 0)
    .toString();
};

const part2 = (rawInput: string) => {
  const [rules, pages] = parseInput(rawInput);

  return pages
    .map((pages) => pages.slice().sort(ruleSort(rules)))
    .filter((page, i) => page.join(",") !== pages[i].join(","))
    .map((page) => page[Math.floor(page.length / 2)])
    .reduce((a, c) => a + parseInt(c, 10), 0)
    .toString();
};

run({
  part1: {
    tests: [
      {
        input: `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: "143",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: "123",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
