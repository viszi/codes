// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-16-power-digit-sum
// 215 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
// What is the sum of the digits of the number 2exponent?

// brute-force way
function powerDigitSum(exponent) {
    let number = BigInt(2) ** BigInt(exponent);
    return number.toString().split('').reduce((s, v) => s += +v, 0);
}

// manual calculation of 2^big
function powerDigitSum(exponent) {

    let numberString = '1';
    let base = 2;
    let counter = 0;

    // genereta the value as a string
    for (let m = 1; m <= exponent; m++) {
        let multiplied = '';
        let remainder = 0;
        for (let i = numberString.length - 1; i >= 0; i--) {
            const product = +numberString[i] * base + remainder;
            multiplied = product % 10 + multiplied;
            remainder = Math.floor(product / 10);
            counter++;
        }

        if (remainder !== 0) {
            multiplied = remainder + multiplied;
        }

        numberString = multiplied;
    }

    // sum the numbers in the string 
    let result = 0;
    for (let i = 0; i < numberString.length; i++) {
        result += +numberString[i];
        counter++;
    }

    console.log(`Iterations: ${counter}`);
    return result;
}


console.log(powerDigitSum(15), 26);
console.log(powerDigitSum(128), 166);
console.log(powerDigitSum(1000), 1366);