// --- Direction
// returns number of vowels in a word
// --- Example
// vowels('Apple') === 2
// vowels('Why?') === 0

const vowelsAr = ["a", "e", "i", "o", "u"];
const vowelsStr = "aeiou";
// const vowelsReg = /[aeiou]/i;
// const vowelsReg = new RegExp(vowelsStr, "i");
const vowelsReg = new RegExp(`[${vowelsStr}]`, "ig");

export function vowels(str: string): number {
  return str.match(vowelsReg)?.length || 0;
}

export function vowels2(str: string): number {
  let rslt = 0;

  for (const char of str.toLowerCase()) {
    // if (vowelsAr.includes(char)) {
    // if (vowelsStr.includes(char)) {
    if (char.match(vowelsReg)) {
      rslt++;
    }
  }

  return rslt;
}
