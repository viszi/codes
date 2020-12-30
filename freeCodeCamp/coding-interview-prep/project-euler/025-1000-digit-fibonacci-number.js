// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-25-1000-digit-fibonacci-number
// The Fibonacci sequence is defined by the recurrence relation:
// Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
// Hence the first 12 terms will be: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
// The 12th term, F12, is the first term to contain three digits.
// What is the index of the first term in the Fibonacci sequence to contain n digits ?

function digitFibonacci(n) {

    // check length of the number
    const numLength = number => Math.floor(Math.log10(number)) + 1;

    let f0 = 1;
    let f1 = 1;
    let counter = 2;

    while (numLength(f1) < n) {
        let temp = f0;
        f0 = f1;
        f1 = temp + f1;
        counter++;
    }

    return counter;
}

console.log(digitFibonacci(5), 21);
console.log(digitFibonacci(10), 45);
console.log(digitFibonacci(15), 69);
console.log(digitFibonacci(20), 93);