// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-6-sum-square-difference
// The sum of the squares of the first ten natural numbers is,
// 1^2 + 2^2 + ... + 10^2 = 385
// The square of the sum of the first ten natural numbers is,
// (1 + 2 + ... + 10)^2 = 552 = 3025
// Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.
// Find the difference between the sum of the squares of the first n natural numbers and the square of the sum.

// brute force way
function sumSquareDifference(n) {

    let counter = 0;

    let sum = 0;  // (1 + 2 + 3 ... )
    let squares = 0;  // 1^2 + 2^2 + 3^2 ...

    for (let i = 1; i <= n; i++) {
        sum += i;
        squares += i * i;
        counter++;
    }

    console.log(`Iterations: ${counter}`)
    return sum * sum - squares;
}

function sumSquareDifference(n) {

    // https://brilliant.org/wiki/sum-of-n-n2-or-n3/
    let sum = n * (n + 1) / 2;
    let squares = n * (n + 1) * (2 * n + 1) / 6;
    let cubes = (n ** 2 * (n + 1) ** 2) / 4;

    return sum * sum - squares;
}


console.log(sumSquareDifference(10), 2640);
console.log(sumSquareDifference(20), 41230);
console.log(sumSquareDifference(100), 25164150);

//             Brute-force Single-step
// Iterations: 10           1
// Iterations: 20           1
// Iterations: 100          1
