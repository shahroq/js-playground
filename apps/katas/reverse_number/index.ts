// --- Direction
// Given a number, return reversed ordering of the number
// --- Example
// reverse_number(15) === 51
// 981 => 189
// 500 => 5
// -15 => 15
// -90 => 9

export function reverse_number(num: number): number {
  // const multiplier = num < 0 ? -1 : 1;

  // return multiplier * parseInt(`${num}`.split("").reverse().join(""));
  // return multiplier * parseInt(num.toString().split("").reverse().join(""));
  return Math.sign(num) * parseInt(num.toString().split("").reverse().join(""));
}
