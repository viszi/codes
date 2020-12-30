// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-20-factorial-digit-sum
// n! means n × (n − 1) × ... × 3 × 2 × 1
// For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
// and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
// Find the sum of the digits n!


// manual way to calculate the bigNumber
function sumFactorialDigits(n) {
    let result = '1';

    for (let m = 2; m <= n; m++) {
        let remainder = 0;
        let multiplied = '';

        // if multiplier is *10 then quickly add zero(s) to the end of existing value
        const powerOf10 = Math.log10(m);
        if (Math.floor(powerOf10) === powerOf10 ) {
            result += '0'.repeat(powerOf10);
            continue;
        }

        for (let i = result.length - 1; i >= 0; i--) {
            const value = +result[i];
            const product = value * m + remainder;

            multiplied = (product % 10) + multiplied;
            remainder = Math.floor(product / 10);
        }

        if (remainder > 0) {
            multiplied = remainder + multiplied;
        }

        result = multiplied;
    }
  
    let sum = 0;
    for (let i = 0; i < result.length; i++) {
        sum += +result[i];
    }

    return sum;
}

console.log(sumFactorialDigits(10), 27);
console.log(sumFactorialDigits(25), 72);
console.log(sumFactorialDigits(50), 216);
console.log(sumFactorialDigits(75), 432);
console.log(sumFactorialDigits(100), 648);