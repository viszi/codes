// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-10-summation-of-primes
// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
// Find the sum of all the primes below n.

// original way
function primeSummation2(n) {

    // helper function to check if number is a prime?
    const isPrime = number => {
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }

    let primeSum = 0;
    let primes = [];

    for (let number = 2; number < n; number++) {
        if (isPrime(number)) {
            primeSum += number;
            primes.push(number);
        }
    }

    return primeSum;
}

// using Sieve of Eratosthenes to know which number is prime
function primeSummation(n) {

    //let primes = Array(n).fill(0);   // this will hold primes 0 = primes, 1 = non-primes
    let primes = new Uint8Array(n);    // this typed array is quicker, but have less methods
    let sum = 0;

    for (let i = 2; i <= n; i++) {
        if (primes[i] === 0) {
            sum += i;

            for (let j = 2 * i; j <= n; j += i) {  // start from the 2nd occurence of the number the flagging any other multiplication
                primes[j] = 1;
            }
        }
    }

    return sum;
}

console.log(primeSummation(17), 41);
console.log(primeSummation(2001), 277050);
console.log(primeSummation(140759), 873608362);
console.log(primeSummation(2000000), 142913828922);

// Number   Original    Sieve_of_Eratosthenes
//                      array       uint8array        
// 17       6.5 ms      6.5 ms      6.5 ms
// 2001     8.6 ms      7 ms        7 ms
// 140759   28.4 ms     13 ms       11 ms
// 2000000  616 ms      74 ms       25 ms
// 20000000 15400 ms    762 ms      233 ms