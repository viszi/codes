// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-30-digit-n-powers
// Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:
// 1634 = 1^4 + 6^4 + 3^4 + 4^4
// 8208 = 8^4 + 2^4 + 0^4 + 8^4
// 9474 = 9^4 + 4^4 + 7^4 + 4^4
// As 1 = 1^4 is not a sum it is not included.
// The sum of these numbers is 1634 + 8208 + 9474 = 19316.
// Find the sum of all the numbers that can be written as the sum of n powers of their digits.


function digitnPowers(n) {

    // use this range https://www.xarg.org/puzzle/project-euler/problem-30/
    let rangeStart = 10;
    let rangeEnd = 354294;

    // helper function
    const sumPowers = (number, power) => number.toString().split('').reduce((s, v) => s += v**power, 0) ;

    let foundNumbers = [];
    let sum = 0;

    for(let i = rangeStart; i < rangeEnd; i++) {       
        if (i == sumPowers(i, n)) {
            sum += i;
            foundNumbers.push(i);
        }
    }

    console.log(`${rangeStart}-${rangeEnd-1} : ${foundNumbers}`);

    return sum;
}


// console.log(digitnPowers(2), 0);
console.log(digitnPowers(3), 1301);
console.log(digitnPowers(4), 19316);
console.log(digitnPowers(5), 443839);