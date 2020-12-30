// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-23-non-abundant-sums
// A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.
// A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.
// As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.
// Find the sum of all positive integers <= n which cannot be written as the sum of two abundant numbers.

function sumOfNonAbundantNumbers(n) {

    // helper function to find all divisors of a given number and decide if it is abundant or not
    const isAbundant = number => {
        let sum = 1;

        // find by pairs
        for (let divisor = 2; divisor <= Math.sqrt(number); divisor++) {
            if (number % divisor === 0) {
                // for 4 the divisors should be 1, 2, 2 instead of 1, 2
                if (divisor === number / divisor) {
                    sum += divisor;
                } else {
                    sum += divisor + number / divisor;
                }
            }
        }
        // abundant if this sum exceeds n
        // deficient if the sum is less
        return sum > number;
    }

    // cache for abundant numbers
    let abundantNums = {};

    // generate abundant numbers (smallest is 12 so we can start from there)
    for (let i = 12; i < n; i++) {
        if (isAbundant(i)) {
            abundantNums[i] = true;
        }
    }

    // cache for sum of 2 abundant numbers 
    let sum2Abundant = {};

    // add to cache only such numbers which are smaller then n
    for (let a in abundantNums) {
        for (let b in abundantNums) {
            const s = Number(a) + Number(b);
            if (s > n) {
                break;
            } else {
                sum2Abundant[s] = true;
            }
        }
    }

    let sum = 0;

    // check all numbers up to n in sum2Abundant
    for (let i = 1; i <= n; i++) {

        if (!sum2Abundant[i]) {
            // console.log(`False: ${i}`)
            sum += i;
        } else {
            //console.log(i);
        }
    }

    return sum;
}

console.log(sumOfNonAbundantNumbers(10000), 3731004);
console.log(sumOfNonAbundantNumbers(15000), 4039939);
console.log(sumOfNonAbundantNumbers(20000), 4159710);
console.log(sumOfNonAbundantNumbers(28123), 4179871);