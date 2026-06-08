import { ReviewOmit } from "./../../server-express/generated/prisma/models/Review";
// --- Direction
// write a func that accepts a pos number N, and console.log a step shape with N levels using '#' character. Make sure steps has spaces on the right hand side.
// --- Example
// pyramid(5) === undefined
// 1: 1 col
// #

// 2: 3 col []
// _#_
// ###

// 3: 5 col
// 00#00 [2-1-2]
// 0###0 [1-3-1]
// ##### [0-5-0]

// 4: 7 col

export function pyramid(n: number): undefined {
  let rslt = [];

  let rows = n;
  let cols = 2 * n - 1;

  for (let i = 1; i <= n; i++) {
    const mid = 2 * i - 1;
    const sides = (cols - mid) / 2;

    rslt.push(
      Array(sides).fill(" ").join("") +
        Array(mid).fill("#").join("") +
        Array(sides).fill(" ").join(""),
    );
  }
  console.log(rslt.join("\n"));
}

pyramid(2);
