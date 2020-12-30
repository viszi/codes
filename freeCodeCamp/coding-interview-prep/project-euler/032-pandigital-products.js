// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-32-pandigital-products
// We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigital.
// The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.
// Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital.
// Hint: Some products can be obtained in more than one way so be sure to only include it once in your sum.

// brute-force way
console.time('r');
function pandigitalProducts() {

    const checkPandigital = (a, b, n) => {
        // store a, b and a*b in a string eg. 391867254
        let result = '' + a + b + a * b;

        // if string is not correct length 
        if (result.length !== n) return false;
        // or if the n-th position is different the value is not ok
        if (result.split('').sort().join('').substring(0, n) != '123456789'.substring(0, n)) return false

        return true
    }

    let pandigitalNums = {};
    let sum = 0;
    let counter = 0;

    // num1 can be max 4 digits
    // num2 can be max 3 digits
    for (let num1 = 1; num1 < 9876; num1++) {
        for (let num2 = 1; num2 < 987; num2++) {
            if (pandigitalNums[num1 * num2] === undefined) {
                counter++;
                if (checkPandigital(num1, num2, 9)) {
                    if (pandigitalNums[num1 * num2]) {
                        let record = pandigitalNums[num1 * num2];
                        pandigitalNums[num1 * num2] = record.concat([[num1, num2]]);
                    } else {
                        pandigitalNums[num1 * num2] = [[num1, num2]];
                        sum += num1 * num2;
                    }
                }
            }
        }
    }

    console.log(`Iterations: ${counter}`);
    console.log(pandigitalNums);
    return sum;
}

console.log(pandigitalProducts(), 45228);
console.timeEnd('r');