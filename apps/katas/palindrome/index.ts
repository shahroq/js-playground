// --- Direction
// Given a string, return true if str is Palindrome, or false otherwise
// P are strings that form a the same word if reversed.
// don not include spaces/puncs in teremining
// --- Example
// palindrome("abba") === true
// palindrome("abbas") === false

export function palindrome(str: string): boolean {
  const rslt = str.split("").every((val, i) => {
    // return val === str[str.length - i - 1];
    return i < val.length ? val === str[str.length - i - 1] : true;
  });

  return rslt;
}

export function palindrome1(str: string): boolean {
  return str.trim().split("").reverse().join("") === str.trim();
}
