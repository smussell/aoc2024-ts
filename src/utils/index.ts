/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */

// find number of occurrences of a char in a string
export const occurences = (str: string, char: string) => (str.match(new RegExp(char, "g")) || []).length;

// return a list with only unique elements, uses mapping fn to find equality
export const uniqueBy = <T>(items: T[], mapper: (item: T) => string) => {
  const seen = new Set();
  const result = [];
  items.forEach((item) => {
    const mapped = mapper(item);
    if (!seen.has(mapped)) {
      result.push(item);
      seen.add(mapped);
    }
  });

  return result;
};

export const isBetween = (n: number, a: number, b: number) => n >= a && n < b;


export const range = (start: number, end?: number) =>
  end
    ? [...Array(end - start).keys()].map(d => d + start)
    : [...Array(start).keys()];

export const zip = <T>(a: T[], b: T[]): T[][] => a.map((_, i) => [a[i], b[i]]);
  
export const dropNth = <T>(arr: T[], i: number): T[] => arr.slice(0, i).concat(arr.slice(i + 1, arr.length));
export const dropLast = <T>(arr: T[]): T[] => dropNth(arr, arr.length - 1);
