// https://www.codewars.com/kata/59ccf051dcc4050f7800008f
// Let s(n) be the sum of these proper divisors of n. Call buddy two positive integers such that the sum of the proper divisors of each number is one more than the other number:
// (n, m) are a pair of buddy if s(m) = n + 1 and s(n) = m + 1
// For example 48 & 75 is such a pair:
//     Divisors of 48 are: 1, 2, 3, 4, 6, 8, 12, 16, 24 --> sum: 76 = 75 + 1
//     Divisors of 75 are: 1, 3, 5, 15, 25 --> sum: 49 = 48 + 1
// Task
// Given two positive integers start and limit, the function buddy(start, limit) should return the first pair (n m) of buddy pairs such that n (positive integer) is between start (inclusive) and limit (inclusive); m can be greater than limit and has to be greater than n

function buddy(start, limit) {
    const sumOfDivisor = {}

    const generateDivisors = num => {
        let sum = 0;
        for (let div = 2; div <= Math.sqrt(num); div++) {
            if (num % div === 0) sum += div + num / div;
        }
        return sum
    }

    for (let i = start; i <= limit; i++) {
        let a;
        let b;
        // add to cache the number when needed
        if (i in sumOfDivisor) {
            a = sumOfDivisor[i];
        } else {
            a = generateDivisors(i);
            sumOfDivisor[i] = a;
        }

        // look for buddy in cache
        if (a in sumOfDivisor) {
            b = sumOfDivisor[a];
        } else {
            b = generateDivisors(a);
            sumOfDivisor[a] = b;
        }

        // check for buddy pairs, start <= n <= limit and m > n
        const n = Math.min(a, b);
        const m = Math.max(a, b);

        if (i === b && n >= start && n <= limit && m > n) return [n, m];
    }
    return "Nothing"
}


console.log(buddy(23, 4669), [48, 75]);
console.log(buddy(4952, 6539), [5775, 6128]);
console.log(buddy(381, 4318), [1050, 1925]);
console.log(buddy(2382, 3679), "Nothing");
console.log(buddy(1071625, 1103735), [1081184, 1331967]);
console.log(buddy(16114, 26272));
console.log(buddy(1, 3895));