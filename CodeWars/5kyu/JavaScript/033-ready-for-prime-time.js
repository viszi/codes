// https://www.codewars.com/kata/521ef596c106a935c0000519/
// Write a method that takes a maximum bound and returns all primes up to and including the maximum bound.
// For example: 11 => [2, 3, 5, 7, 11]

function prime(num) {
    if (num < 2) return [];

    const primes = new Uint8Array(num + 1);
    let result = [];

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (primes[i] === 0) {
            result.push(i);
            for (let j = i * i; j <= num; j += i) {
                primes[j] = 1;
            }
        }
    }

    for (let i = Math.floor(Math.sqrt(num)) + 1; i <= num; i++) {
        if (primes[i] === 0) result.push(i);
    }

    return result
}



console.log(prime(0), []);
console.log(prime(1), []);
console.log(prime(2), [2]);
console.log(prime(23), [2, 3, 5, 7, 11, 13, 17, 19, 23]);