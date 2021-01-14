// https://www.codewars.com/kata/5877e7d568909e5ff90017e6
// We want to generate all the numbers of three digits where:
// - the sum of their digits is equal to 10.
// - their digits are in increasing order (the numbers may have two or more equal contiguous digits)

// The numbers that fulfill the two above constraints are: 118, 127, 136, 145, 226, 235, 244, 334

// Make a function that receives two arguments:
// - the sum of digits value
// - the desired number of digits for the numbers

// The function should output an array with three values: [1,2,3]
// 1 - the total number of possible numbers
// 2 - the minimum number
// 3 - the maximum number

// The example given above should be:
// findAll(10, 3) => [8, "118", "334"]

// If we have only one possible number as a solution, it should output a result like the one below:
// findAll(27, 3) => [1, "999", "999"]

// If there are no possible numbers, the function should output the empty array.
// findAll(84, 4) => []

// Features of the random tests:
// - Number of tests: 112
// - Sum of digits value between 20 and 65
// - Amount of digits between 2 and 17

function findAll(n, k, start = 1, final = true) {
    let result = [];

    // handle the case when single digit is more than 9
    if (n / k > 9) return [];

    for (let first = start; first < 10; first++) {
        if (k - 1 > 1 & n - first > 0) {
            // call recursively the function with updated arguments
            const subResult = findAll(n - first, k - 1, first, false);

            if (subResult.length > 0) {
                // adding the first number before all found numbers
                subResult.forEach(v => {
                    result.push(Number('' + first + v));
                });
            }
        } else {
            // the second digit can be calculates as "n - first"
            const second = n - first;

            // we should accept only such second digit which is between 1 & 9 and greater or equal to first
            if (second > 0 && second < 10 && second >= first) {
                result.push(Number('' + first + second));
            }
        }
    }

    if (final) {
        return [result.length, '' + Math.min(...result), '' + Math.max(...result)];
    } else {
        return result;
    }
}

console.log(findAll(10, 3), [8, '118', '334']);
console.log(findAll(27, 3), [1, '999', '999']);
console.log(findAll(84, 4), []);
console.log(findAll(35, 6), [123, '116999', '566666']) 