// --- Direction
// Write a program that clg the numbers from 1 to n. But for multiplies of 3 print "fizz" instead of the number. for multplies of 5 'buzz', and 3&5, print 'fizzbuzzs'
// --- Example
// fizz_buz(5): 1,2,fizz,4,buzz

// steven: don't get fancy with this fizzbuzz problem!
export function fizz_buzz(num: number): void {
  for (let i = 1; i <= num; i++) {
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

// fizz_buzz(10);
