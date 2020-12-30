// https://www.youtube.com/watch?v=oBt53YbR9Kk&t=14481s
// write a function that return how the targetsum can be generated from the numbers in the given array


// Memoization
// complexitiy time: O(n^m * m), space: O(m)         m = targetSum, n = numbers.length
function howSum(targetSum, numbers, memo = {}) {
    if (targetSum in memo) return memo[targetSum];

    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    for (let num of numbers) {
        const remainder = targetSum - num;
        const remainderResult = howSum(remainder, numbers, memo);
        if (remainderResult !== null) {
            memo[targetSum] = [...remainderResult, num];
            return memo[targetSum];
        }
    }
    memo[targetSum] = null;
    return null;
}

// Tabulation
// create targetSum + 1 length array, initialize with null values
// add result to array
// 0th position is an empty array
// complexitiy time: O(m*n*m), space: O(m*m)         m = targetSum, n = numbers.length

function howSum(targetSum, numbers) {
    const table = Array(targetSum + 1).fill(null);
    table[0] = [];

    for (let i = 0; i <= targetSum; i++) {
        if (table[i] !== null) {
            const current = table[i];

            for (let num of numbers) {
                if (i + num <= targetSum) {
                    table[i + num] = [...current, num];
                }
            }
        }
    }
    return table[targetSum];
}

console.log(howSum(7, [2, 3]), [3, 2, 2]);
console.log(howSum(7, [5, 3, 4, 7]), [4, 3]);
console.log(howSum(7, [2, 4]), null);
console.log(howSum(8, [2, 3, 5]), [2, 2, 2, 2]);
console.log(howSum(300, [7, 14]), null);