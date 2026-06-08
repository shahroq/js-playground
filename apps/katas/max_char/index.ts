// --- Direction
// Given a string, return the character that is most commonly used in the string
// --- Example
// max_char('abccccd') === "c"
// max_char('apple 12311111') === "1"

// type Stat = Record<string, number>;
type CharMap = {
  [key: string]: number;
};

export function max_char(str: string): string {
  let charMap: CharMap = {
    "": 0,
  };

  for (let char of str) {
    // chars[char] = chars[char] ? chars[char] + 1 : 1;
    charMap[char] = charMap[char] + 1 || 1;
  }

  let maxChar = "";
  for (let rec in charMap) {
    maxChar = charMap[maxChar] < charMap[rec] ? rec : maxChar;
  }

  return maxChar;
}
