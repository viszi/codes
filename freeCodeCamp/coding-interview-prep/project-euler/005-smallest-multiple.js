// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-5-smallest-multiple
// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to n?

// brute-force way
function smallestMult(n) {

    // start number from the biggest
    let result = n - 1;

    let found;
    let counter = 0;

    // increase the result by one until the number is not fully divisible by the numbers
    do {
        result++;

        // check if number is divisible by all numbers or not
        found = true;
        for (let i = 2; i <= n; i++) {
            if (result % i !== 0) {
                found = false;
                break;
            }
            counter++;
        }

    } while (!found);

    console.log(`Iterations: ${counter}`);
    return result;

}

// finding common factors and multiply them
function smallestMult(n) {

    let allFactors = {};

    let counter = 0;

    // get the unique factors of the values
    for (let i = 2; i <= n; i++) {
        let number = i;
        let divisor = 2;
        let factors = {};

        while (number > 1) {
            if (number % divisor === 0) {
                factors[divisor] = (factors[divisor] || 0) + 1;
                number /= divisor;
            } else {
                divisor += (divisor > 2 ? 2 : 1);
            }
            counter++;
        }

        // check if the factors of the number is enough in allFactors
        for (let factor in factors) {
            // add to allfactors missing values or increase the occurences to the minimum needed
            if (factors[factor] > (allFactors[factor] || 0)) {
                allFactors[factor] = factors[factor];
            }
            counter++;
        }
    }

    let result = 1;

    for (let factor in allFactors) {
        result *= (+factor) ** allFactors[factor];
        counter++;
    }

    console.log(`Iterations: ${counter}`);
    return result;
}

console.log(smallestMult(5), 60);
console.log(smallestMult(7), 420);
console.log(smallestMult(10), 2520);
console.log(smallestMult(13), 360360);
console.log(smallestMult(20), 232792560);

//                      Brute force         Factors
// Iterations/runtime:  44 (7 ms)           15 (7 ms)
// Iterations:          326 (8 ms)          26 (7 ms)
// Iterations:          1980 (9 ms)         40 (7 ms)
// Iterations:          283873 (22 ms)      63 (7 ms)
// Iterations:          183389414 (1037 ms) 117 (7 ms)