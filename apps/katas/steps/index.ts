// --- Direction
// write a func that accepts a pos number N, and console.log a step shape with N levels using '#' character. Make sure steps has spaces on the right hand side.
// --- Example
// steps(5) === undefined

export function steps(n: number): undefined {
  let rslt = [];

  for (let i = 1; i <= n; i++) {
    rslt.push(
      Array(i).fill("#").join("") +
        Array(n - i)
          .fill(" ")
          .join(""),
    );
  }
  console.log(rslt.join("\n"));
}

// steps(2);
