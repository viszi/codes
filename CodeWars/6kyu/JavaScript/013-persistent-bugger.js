// https://www.codewars.com/kata/55bf01e5a717a0d57e0000ec
// Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit.
//  persistence(39) === 3 // because 3*9 = 27, 2*7 = 14, 1*4=4
//                        // and 4 has only one digit
//  persistence(999) === 4 // because 9*9*9 = 729, 7*2*9 = 126,
//                         // 1*2*6 = 12, and finally 1*2 = 2
//  persistence(4) === 0 // because 4 is already a one-digit number

function persistence(num) {
    // count number of steps
    let steps = 0;

    // convert input to an array
    num = num.toString().split('');

    // work on the array until length is just 1
    while (num.length > 1) {
        // use reduce to calculate the new number
        num = num.reduce((acc, value) => {
            return acc *= value;
        }).toString().split('');
        steps += 1;
    }

    return steps;
}

console.log(persistence(39), 3);
console.log(persistence(4), 0);
console.log(persistence(25), 2);
console.log(persistence(999), 4);