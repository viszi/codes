// https://www.codewars.com/kata/52f787eb172a8b4ae1000a34
// Write a program that will calculate the number of trailing zeros in a factorial of a given number.
// N! = 1 * 2 * 3 * ... * N
// For more info, see: http://mathworld.wolfram.com/Factorial.html
// zeros(6) = 1
// # 6! = 1 * 2 * 3 * 4 * 5 * 6 = 720 --> 1 trailing zero
// zeros(12) = 2
// # 12! = 479001600 --> 2 trailing zeros
// Hint: You're not meant to calculate the factorial. Find another way to find the number of zeros.

function zeros(n) {
    // const logBase = (n, base) => Math.log(n) / Math.log(base);
    // kmax is floor of log5 n
    let kmax = Math.floor(Math.log(n) / Math.log(5))
    
    let sum = 0;
    
    // sum from 1 to kmax the floor of n/5^k
    for (let i = 1; i <= kmax; i++) {
        sum += Math.floor(n / Math.pow(5, i));
    }

    return sum
}

console.log(zeros(0), 0);
console.log(zeros(5), 1);
console.log(zeros(6), 1);
console.log(zeros(30), 7);