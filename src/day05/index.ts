import run from "aocrunner";

const parseInput = (
  rawInput: string,
): [string[][], string[][], Record<string, Set<string>>] => {
  const [ruleStrings, orderStrings] = rawInput.split("\n\n");

  const rules = ruleStrings.split("\n").map((d) => d.split("|"));
  const orders = orderStrings.split("\n").map((d) => d.split(","));

  const ruleMap = rules.reduce<Record<string, Set<string>>>((a, [p1, p2]) => {
    if (a[p2]) {
      a[p2].add(p1);
    } else {
      a[p2] = new Set([p1]);
    }
    return a;
  }, {});

  return [rules, orders, ruleMap];
};

const verifyList = (order: string[], ruleMap: Record<string, Set<string>>) => {
  return order.every((page, i) => {
    const prefixSet = ruleMap[page];
    const remaining = order.slice(i + 1, order.length);

    return prefixSet == undefined || remaining.every((p) => !prefixSet.has(p));
  });
};

const part1 = (rawInput: string) => {
  const [_, orders, ruleMap] = parseInput(rawInput);

  return orders
    .filter((order) => verifyList(order, ruleMap))
    .map((order) => order[Math.floor(order.length / 2)])
    .reduce((a, c) => a + parseInt(c, 10), 0)
    .toString();
};

const part2 = (rawInput: string) => {
  const [rules, orders, instMap] = parseInput(rawInput);

  const orderedList = [];
  rules.forEach((instruction) => {});

  return orders
    .filter((order) => !verifyList(order, instMap))
    .map((order) =>
      order.sort((a, b) => {
        const rule = rules.find((rule) => rule.includes(a) && rule.includes(b));
        // if theres no rule with both vals -> 0, if there is a rule if a is first -1 if be is first 1
        return rule ? (rule[0] === a ? -1 : 1) : 0;
      }),
    )
    .map((order) => order[Math.floor(order.length / 2)])
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
