// --- Direction
// write a function accepting an integer N, returning a N*N soiral matrix
// --- Example
// matrix(2) -->
// [[1,2],
//  [4,3]],
// matrix(3) -->
// [[1,2,3],
//  [8,9,4],
//  [7,6,5]],
// matrix(4) -->
// [[ 1, 2, 3, 4],
//  [12,13,14, 5],
//  [11,16,15, 6],
//  [10, 9, 8, 7]],

export function spiral_matrix(n: number): number[][] {
  // const row = Array(n).fill(0);
  // const rslt = Array(n).fill([...row]);
  const rslt = [];
  let counter = 1;

  for (let i = 0; i < n; i++) rslt.push([]);

  let curRow = 0;
  let curCol = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rslt[i][j] = counter++;
    }
  }

  // rslt[1][2] = 4;
  console.log(rslt);

  return [
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5],
  ];
}
