// https://www.codewars.com/kata/54da5a58ea159efa38000836
// Given an array of integers, find the one that appears an odd number of times.
// There will always be only one integer that appears an odd number of times.

function findOdd(A) {
    // create an object which will store number of occurences of each numbers
    let result = {};

    // loop through the array to count the occurences of each element
    for (let i = 0; i < A.length; i++) {
        let num = A[i];
        result[num] = result[num] || 0;
        result[num]++;
    }

    // find the element in the result with odd occurence
    for (key in result) {
        if (result[key] % 2 != 0) {
            return +key
        }
    }
}

console.log(findOdd([20, 1, -1, 2, -2, 3, 3, 5, 5, 1, 2, 4, 20, 4, -1, -2, 5]), 5);
console.log(findOdd([1, 1, 2, -2, 5, 2, 4, 4, -1, -2, 5]), -1);
console.log(findOdd([20, 1, 1, 2, 2, 3, 3, 5, 5, 4, 20, 4, 5]), 5);
console.log(findOdd([10]), 10);
console.log(findOdd([1, 1, 1, 1, 1, 1, 10, 1, 1, 1, 1]), 10);
console.log(findOdd([5, 4, 3, 2, 1, 5, 4, 3, 2, 10, 10]), 1);