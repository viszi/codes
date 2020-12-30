// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-21-amicable-numbers
// Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
// If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.
// For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.
// Evaluate the sum of all the amicable numbers under n.

function sumAmicableNum(n) {

    // helper function to find all divisors of a given number
    const sumFoundDivisors = number => {
        // add evidents 1 and number -- in this case number is not needed
        let divisors = [1];
        let sum = 1;

        // find by pairs
        for (let divisor = 2; divisor <= Math.sqrt(number); divisor++) {
            if (number % divisor === 0) {
                // for 4 the divisors should be 1, 2, 2 instead of 1, 2
                if (divisor === number / divisor) {
                    divisors.push(divisor);
                    sum += divisor;
                } else {
                    divisors.push(divisor, number / divisor);
                    sum += divisor + number / divisor;
                }
            }
        }
        return sum;
    }

    // place to store checked numbers { 'num': sum }
    let cache = {};

    // store amicable numbers
    let amicable = [];

    let i = 1;
    while (i <= n) {
        let sumDivisors;

        if (!cache[i]) {
            // generate the sum of the divisors for the number
            sumDivisors = sumFoundDivisors(i);

            // add to cache the found value
            cache[i] = sumDivisors;
        }

        // generate guickly the amicable pair
        if (sumDivisors > 0 && !cache[sumDivisors]) {
            cache[sumDivisors] = sumFoundDivisors(sumDivisors);
        }

        // compare the values and add them if they are amicable pair
        if (i === cache[sumDivisors] && i !== cache[i]) {
            amicable.push(i, sumDivisors);
        }

        i++;
    }

    return amicable.reduce((s, v) => s += v);
}

console.log(sumAmicableNum(1000), 504);
console.log(sumAmicableNum(2000), 2898);
console.log(sumAmicableNum(5000), 8442);
console.log(sumAmicableNum(10000), 31626);