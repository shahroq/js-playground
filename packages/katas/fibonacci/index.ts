// --- Direction
// fib: each number is the sum of the preceding too
// first 10 entries of fib sequence: [0,1,  1,2,3,5,8,13,21,34]
// --- Example
// fib(4) === 3

function memoize(fn) {
  const cache = {};

  return function (...args) {
    if (cache[args]) return cache[args];

    const rslt = fn.apply(this, args);
    cache[args] = rslt;

    return rslt;
  };
}

export const fastFib = memoize(fib);

///////////////////////

// recursive solution w/ internal memoization
const memoized: Record<number, number> = [];

export function fastFibInt(n: number): number {
  if (memoized[n]) return memoized[n];

  let rslt = 0;

  if (n < 2) {
    rslt = n;
  } else {
    rslt = fastFibInt(n - 1) + fastFibInt(n - 2);
  }

  memoized[n] = rslt;
  return rslt;
}

// recursive solution/ runtime: exponential O(2^n)
export function fib(n: number): number {
  // if (n == 0) return 0;
  // if (n == 1) return 1;
  if (n < 2) return n;

  return fib(n - 1) + fib(n - 2);
}

// reiterative solution
export function fib2(n: number): number {
  const rslt = [0, 1];

  for (let i = 2; i <= n; i++) {
    rslt.push(rslt[i - 2] + rslt[i - 1]);
  }

  return rslt[n];
}

export function fib1(n: number): number {
  let rslt = 0;
  if (n === 1) rslt = 1;
  // if (n <= 2) rslt = n;

  let num_2 = 0; // prev of prev
  let num_1 = 1; // prev

  for (let i = 2; i <= n; i++) {
    rslt = num_2 + num_1;

    num_2 = num_1;
    num_1 = rslt;
  }

  return rslt;
}
