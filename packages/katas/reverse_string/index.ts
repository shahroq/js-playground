// --- Direction
// Given a string, return reversed order of characters
// --- Example
// reverse_string("abc") === 'cba'

export function reverse_string(str: string): string {
  return str.split("").reduce((acc, cur) => cur + acc, "");
}

export function reverse_string3(str: string): string {
  let rslt = "";
  //   for (let i = 0; i < str.length; i++) rslt = str[i] + rslt;
  for (const char of str) {
    rslt = char + rslt;
  }
  return rslt;
}

export function reverse_string_2(str: string): string {
  let rslt = [];
  for (let i = 0; i < str.length; i++) {
    rslt.unshift(str[i]);
  }
  return rslt.join("");
}

export function reverse_string_1(str: string): string {
  return str.split("").reverse().join("");
}
