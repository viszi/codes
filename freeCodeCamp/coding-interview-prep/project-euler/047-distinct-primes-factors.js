// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-47-distinct-primes-factors
// The first two consecutive numbers to have two distinct prime factors are:
// 14 = 2 × 7
// 15 = 3 × 5
// The first three consecutive numbers to have three distinct prime factors are:
// 644 = 2^2 × 7 × 23
// 645 = 3 × 5 × 43
// 646 = 2 × 17 × 19
// Find the first four consecutive integers to have four distinct prime factors each. What is the first of these numbers?


// brute-force way
function distinctPrimeFactors(targetNumPrimes, targetConsecutive) {

    let cachePrimes = { '2': true, '3': true, '5': true, '7': true };

    // helper function to find factors
    const findPrimeFactors = (number, count) => {
        let factors = {};

        // helper to check number is prime or not
        const isPrime = value => {

            // first check if it is in prime cache
            if (cachePrimes[value]) {
                return true;
            } else {
                // check the hard way
                if (value % 2 === 0) return false;

                for (let i = 3; i <= Math.sqrt(value); i += 2) {
                    if (value % i === 0) return false;
                }
                return true;
            }
        }

        let divisor = 2;

        while (number > 1) {
            if (number % divisor === 0) {
                if (isPrime(divisor)) {
                    factors[divisor] = true;
                    number /= divisor;

                    //break the loop immediatly if number of factors is bigger than expected
                    if (Object.keys(factors).length > count) return [];

                } else {
                    return [];
                }
            } else {
                if (divisor === 2) {
                    divisor += 1;
                } else {
                    divisor += 2;;
                }
            }
        }

        return Object.keys(factors);
    }


    let numbers = {};
    let result = [];

    let i = 14;

    while (result.length < targetConsecutive) {
        const primeFactors = findPrimeFactors(i);

        // store only such values which have exactly the same prime factors
        if (primeFactors.length === targetNumPrimes) {
            numbers[i] = primeFactors;

            // check the result array
            if (result.length > 0) {
                // if it is not empty then check the last value
                const lastResult = result[result.length - 1];

                // if last value is the previous number then add
                // else empty the array and add the current one
                if (i === lastResult + 1) {
                    result.push(i);
                } else {
                    result = [i];
                }

            } else {
                // if it is empty add the found value
                result.push(i);
            }
        }
        i++;
    }

    return result[0];
}

// console.time("Run");
// https://www.xarg.org/puzzle/project-euler/problem-47/
function solution(horizon, numFactors, seqLength) {

    let count = 0;
    const primCount = new Uint8Array(horizon + 1);   // this array will hold all primefactors of numbers 1 to horizon
    for (let i = 2; i <= horizon; i++) {

        if (primCount[i] === numFactors) {
            count++;
            if (count === seqLength) {
                return i - seqLength + 1;
            }
        } else {
            count = 0;
            if (0 === primCount[i]) {               // Eratoszthenész szitája
                for (var j = i; j <= horizon; j += i) {
                    primCount[j]++;
                }
            }
        }
    }
    return null;
}

// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
function hor(n) {
    const horizon = n;
    const primCount = new Uint8Array(horizon + 1);
    for (let i = 2; i <= horizon; i++) {
        if (primCount[i] === 0) {
            for (let j = i; j <= horizon; j+= i) {
                primCount[j]++;
            }
        }
    }

    return primCount;
}
//console.log(hor(10));
//console.log(solution(150000, 4, 4));

console.log(distinctPrimeFactors(2, 2), 14);
console.log(distinctPrimeFactors(3, 3), 644);
console.log(distinctPrimeFactors(4, 4), 134043);
//console.timeEnd("Run");
