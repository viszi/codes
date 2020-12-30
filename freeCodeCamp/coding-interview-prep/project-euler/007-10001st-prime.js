// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-7-10001st-prime
// By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
// What is the nth prime number?

// brute-force way
function nthPrime2(n) {

    if (n < 2) return 0;
    let counter = 0;

    // helper function to find if a number is prime
    const isPrime = (number) => {
        if (number % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(number); i += 2) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    };

    let i = 3;            // start from 3
    let countPrimes = 2;  // 2 and 3 already counted
    let lastPrime;

    while (countPrimes < n) {
        counter++;
        i++;
        if (isPrime(i)) {
            countPrimes++
            lastPrime = i;
        }
    }
    console.log(counter);
    return lastPrime;
}

// using Sieve of Eratosthenes
function nthPrime(n) {

    let size = 104744; // how to know the size?
    let primes = new Uint8Array(size);
    let counter = 0;

    for (let i = 2; i < size; i++) {
        if (primes[i] === 0) {
            counter++;
            for (let j = 2 * i; j < size; j += i) {
                primes[j] = 1;
            }
        }

        if (counter === n) return i;
    }
}

console.log(nthPrime(6), 13);
console.log(nthPrime(10), 29);
console.log(nthPrime(100), 541);
console.log(nthPrime(1000), 7919);
console.log(nthPrime(10001), 104743);

//          Brute-force ESieve
// Runtime: 7 ms        7ms
//          7 ms        12 ms
//          7 ms        12 ms
//          11 ms       13 ms
//          18 ms       13 ms
