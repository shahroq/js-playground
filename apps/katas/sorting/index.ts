// --- Direction
// Implement Bubble/Selection/Merge sort

// @ts-nocheck

export function bubble_sort(ar) {
  for (let i = 0; i < ar.length; i++) {
    for (let j = 0; j < ar.length - i - 1; j++) {
      // console.log(i, j);
      // if (ar[j + 1] !== undefined && ar[j] > ar[j + 1]) swap(ar, j, j + 1);
      if (ar[j] > ar[j + 1]) swap(ar, j, j + 1);
    }
    // console.log("---");
  }
  return ar;
}

// prove-me-wrong alg
export function selection_sort(ar) {
  for (let i = 0; i < ar.length; i++) {
    let indexOfMin = i;

    for (let j = i + 1; j < ar.length; j++) {
      // console.log(i, j);
      if (ar[j] < ar[indexOfMin]) indexOfMin = j;
    }
    // console.log("---", i, indexOfMin);
    if (i !== indexOfMin) swap(ar, i, indexOfMin);
  }
  return ar;
}

export function merge_sort(ar) {
  return [];
}

const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};
