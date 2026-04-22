// --- Direction
// Check to see if 2 provide strings are anagrams of eachother (they have the same character in the same quantity). only consider characters, not spaces and puncs. consider capital letters to be the same
// --- Example
// anagram('rail safety', 'fairy tales') ---> true
// anagram('RAIL! SAFETY!', 'fairy tales') ---> true
// anagram('Hi there', 'Bye there') ---> false

export function anagram(str1: string, str2: string): boolean {
  const charAr1 = str1.cleanUp().split("").sort().join("");
  const charAr2 = str2.cleanUp().split("").sort().join("");

  return charAr1 === charAr2;
}

export function anagram_3(str1: string, str2: string): boolean {
  const charAr1 = cleanString(str1).split("").sort().join("");
  const charAr2 = cleanString(str2).split("").sort().join("");

  return charAr1 === charAr2;
}

type ArrayMap = Record<string, number>;

export function anagram_2(str1: string, str2: string): boolean {
  const charMap1 = buildArrayMap(str1);
  const charMap2 = buildArrayMap(str2);

  if (Object.keys(charMap1).length !== Object.keys(charMap2).length)
    return false;

  for (const key in charMap1) {
    if (!(key in charMap2) || charMap1[key] !== charMap2[key]) return false;
  }

  return true;
}

const buildArrayMap = (str: string): ArrayMap => {
  const charMap = {};

  str = cleanString(str);

  for (let char of str) {
    // if (!char.match(/[a-zA-Z]/)) continue;
    // char = char.toLowerCase();
    charMap[char] = charMap[char] ? charMap[char] + 1 : 1;
  }

  return charMap;
};

const cleanString = (str) => str.replace(/[^\w]/g, "").toLocaleLowerCase();

declare global {
  interface String {
    cleanUp(): string;
  }
}

String.prototype.cleanUp = function (): string {
  return this.replace(/[^\w]/g, "").toLocaleLowerCase();
};
