// --- Direction
// Given any array and (chunk) size, divide the array into many subarrays where each subarray is of length size
// --- Example
// chunk([1,2,3,4], 2) --> [[1,2],[3,4]]
// chunk([1,2,3,4,5], 2) --> [[1,2],[3,4], [5]]
// chunk([1,2,3,4,5,6,7,8], 3) --> [[1,2,3],[4,5,6], [7,8]]
// chunk([1,2,3,4,5], 4) --> [[1,2,3,4],[5]]
// chunk([1,2,3,4,5], 10) --> [[1,2,3,4,5]]

export function chunk(ar: unknown[], size: number): unknown[] {
  const chunked = [];
  let index = 0;

  while (index < ar.length) {
    chunked.push(ar.slice(index, index + size));
    index += size;
  }

  return chunked;
}

export function chunk_2(ar: unknown[], size: number): unknown[] {
  const chunked = [];

  for (let i = 0; i < Math.ceil(ar.length / size); i++) {
    chunked.push(ar.slice(i * size, i * size + size));
  }

  return chunked;
}
