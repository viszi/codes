// https://www.codewars.com/kata/554e52e7232cdd05650000a0
// Create a function that returns the lowest product of 4 consecutive digits in a number given as a string.
// This should only work if the number has 4 digits or more. If not, return "Number is too small".
// Example
// lowestProduct("123456789")--> 24 (1x2x3x4)
// lowestProduct("35") --> "Number is too small"

function lowestProduct(str) {
    const numbers = str.split('');

    if (numbers.length < 4) return "Number is too small";

    let smallest = Infinity;
    for (let i = 0; i < numbers.length - 3; i++) {
        const consec = numbers.slice(i, i + 4);
        const product = consec.reduce((p, v) => p *= +v, 1);
        smallest = product < smallest ? product : smallest;
    }

    return smallest;
}

function lowestProduct(str) {
    const results = str.split('').map((v, i, a) => {
        if (i > a.length - 4) {
            return Infinity;
        } else {
            return  v * a[i+1]* a[i+2] * a[i+3];
        }
    })

    return (str.length > 4) ? Math.min(...results) : 'Number is too small';
}

console.log(lowestProduct("123456789"), 24); //(1x2x3x4)
console.log(lowestProduct("35"), "Number is too small");
console.log(lowestProduct("234567899"), 120);
console.log(lowestProduct("2345611117899"), 1);
console.log(lowestProduct("333"), "Number is too small");
console.log(lowestProduct("1234111"), 4);  