const arr = [5, 1, 2, 3, 4];

///
// const reducerSum = (acc, cur) => (acc += cur);
// console.log(arr.reduce(reducerSum, 0));
// console.log(arr.reduce(reducerSum, ""));

///
const reducerMax = (acc, cur) => {
  console.log(cur);
  return Math.max(acc, cur);
};

//console.log("rslt:" + arr.reduce(reducerMax));

const array = [15, 16, 17, 18, 19];

function reducer(accumulator, currentValue, index) {
  const returns = accumulator + currentValue;
  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`,
  );
  return returns;
}

array.reduce(reducer, 0);
