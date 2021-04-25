// https://www.codewars.com/kata/59aa6567485a4d03ff0000ca
// Consider the prime number 23. If we sum the square of its digits we get: 2^2 + 3^2 = 13, then for 13: 1^2 + 3^2 = 10, and finally for 10: 1^2 + 0^2 = 1.
// Similarly, if we start with prime number 7, the sequence is: 7->49->97->130->10->1.
// Given a range, how many primes within that range will eventually end up being 1?
// The upperbound for the range is 50,000. A range of (2,25) means that: 2 <= n < 25.

function solve(a, b) {
    // store what will be the sequence end for a number
    let memo = { '1': 1 };

    const reduction = number => {
        let sequence = [number];
        let next = number;

        while (true) {
            if (next < 10) {
                next *= next;
            } else {
                next = String(next).split('').reduce((s, v) => s += v * v, 0)
            }
            if (sequence.includes(next)) break;
            sequence.push(next);
        }

        for (num of sequence) {
            memo[num] = next;
        }

        return next;
    }

    let counter = 0;

    // generate primes
    const primes = new Uint8Array(b + 1).fill(0);
    primes[0] = 1;
    primes[1] = 1;

    for (let i = 2; i < b; i++) {
        if (primes[i] === 0) {
            for (let j = i + i; j < b + 1; j += i) {
                primes[j] = 1;
            }
            // check if prime ends up to 1 
            if (i >= a && reduction(i) === 1) counter++;
        }
    }

    return counter;
}

console.log(solve(1, 25), 4);
console.log(solve(100, 1000), 28);
console.log(solve(100, 2000), 47);
console.log(solve(100, 3000), 65);
console.log(solve(100, 4000), 95);
console.log(solve(78, 3833), 93);
