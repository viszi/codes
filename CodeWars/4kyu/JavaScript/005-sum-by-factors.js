// https://www.codewars.com/kata/54d496788776e49e6b00052f
// Given an array of positive or negative integers
// I= [i1,..,in]
// you have to produce a sorted array P of the form
// [ [p, sum of all ij of I for which p is a prime factor (p positive) of ij] ...]
// P will be sorted by increasing order of the prime numbers. The final result has to be given as a string in Java, C#, C, C++ and as an array of arrays in other languages.
// Example:
// I = [12, 15]; //result = [[2, 12], [3, 27], [5, 15]]

function sumOfDivided(lst) {

    let copy = [...lst];        // work on the copy of the original, here the numbers will be divided 
    let result = [];            // array to store the result
    let divisor = 2;            // starting divisor what will be increased in the loop

    // helper function to see do we have left any value which can be factorized
    const allDivided = array => {
        return array.some(value => Math.abs(value) > 1);
    }

    // do loop until all values are |1|
    while (allDivided(copy)) {
        let addtoResult = false;

        let sum = 0;
        // loop through the array elements
        for (let i = 0; i < copy.length; i++) {

            // if actual value is still not |1|
            if (Math.abs(copy[i]) > 1) {
                // then see if it is a factor of the current divisor
                if (copy[i] % divisor === 0) {
                    // if yes, we sum the original value
                    sum += lst[i];
                    addtoResult = true;

                    // perform more divides with the current divisor if it is possible
                    while (copy[i] % divisor === 0) {
                        copy[i] /= divisor;
                    }
                }
            }
        }

        // only add the divisor and sum to the result if it was a divisor of at least 1 number
        if (addtoResult) {
            result.push([divisor, sum]);
        }
        divisor++;
    }

    return result;
}

console.log(sumOfDivided([12, 15]), '==>', [[2, 12], [3, 27], [5, 15]]);
console.log(sumOfDivided([15, 21, 24, 30, 45]), '==>', [[2, 54], [3, 135], [5, 90], [7, 21]]);
console.log(sumOfDivided([15, 21, 24, 30, -45]), '==>', [[2, 54], [3, 45], [5, 0], [7, 21]]);