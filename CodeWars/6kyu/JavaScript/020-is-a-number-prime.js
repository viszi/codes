// https://www.codewars.com/kata/5262119038c0985a5b00029f
// Define a function that takes one integer argument and returns logical value true or false depending on if the integer is a prime.
// Per Wikipedia, a prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.
// Requirements:
// - You can assume you will be given an integer input.
// - You can not assume that the integer will be only positive. You may be given negative numbers as well (or 0).
// - NOTE on performance: There are no fancy optimizations required, but still the most trivial solutions might time out. Numbers go up to 2^31 (or similar, depends on language version). Looping all the way up to n, or n/2, will be too slow.

//create Sieve of Eratosthenes 
function isPrime(num) {
    // return obvious cases
    // 1 or less is false
    if (num < 1) return false;

    let primes = new Uint8Array(num + 1);
    for (let i = 2; i < num + 1; i++) {
        if (primes[i] === 0) {
            for (let j = i + i; j < num + 1; j += i) {
                primes[j] = 1;
            }
        }
    }

    return primes[num] === 0;
}

// checking divisors up-to sqrt(num)
function isPrime(num) {

    // return obvious cases
    // 1 or less is false
    if (num <= 1) return false;

    // for 2 and 3 return true;
    if (num < 4) return true;

    if (num % 2 === 0) return false;

    let divisor = 3
    while (divisor <= Math.sqrt(num)) {
        if (num % divisor === 0) {
            return false;
        } else {
            divisor += 2;
        }
    }
    return true;
}


console.log(isPrime(0), false); //, "0 is not prime");
console.log(isPrime(1), false); //, "1 is not prime");
console.log(isPrime(2), true); //, "2 is prime");
console.log(isPrime(73), true); //, "73 is prime");
console.log(isPrime(75), false); //, "75 is not prime");
console.log(isPrime(-1), false); //, "-1 is not prime");
console.log(isPrime(351512155), false);
// console.log(isPrime(9007199254740991, false));

//                  Sieve of Eratosthenes    Div till Sqrt(num)
// 351512155        6 sec                    6 ms
// 9007199254740991                          7 ms