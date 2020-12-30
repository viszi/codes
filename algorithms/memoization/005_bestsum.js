// https://www.youtube.com/watch?v=oBt53YbR9Kk&t=14481s
// write a function that return the shortest way to generate from the numbers in the given array the targetsum

// Memoization
function bestSum(targetSum, numbers, memo = {}) {
    if (targetSum in memo) return memo[targetSum];

    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    let shortestCombination = null;

    for (let num of numbers) {
        const remainder = targetSum - num;
        const remainderCombination = bestSum(remainder, numbers, memo);
        if (remainderCombination !== null) {
            const combination = [...remainderCombination, num];
            if (shortestCombination === null || combination.length < shortestCombination.length) {
                shortestCombination = combination;
            }
        }
    }
    memo[targetSum] = shortestCombination;
    return shortestCombination;
}
// Tabulation
// Complexitiy time:  O(m*n*m) , space: O(m*m)

function bestSum(targetSum, numbers) {
    const table = Array(targetSum + 1).fill(null);
    table[0] = [];

    for (let i = 0; i <= targetSum; i++) {
        if (table[i] !== null) {
            for (let num of numbers) {
                const combination = [...table[i], num];
                // we should store the combination only if it is shorter than already existing
                if (!table[i + num] || table[i + num].length > combination.length) {
                    table[i + num] = combination;
                }
            }
        }
    }
    return table[targetSum];
}

console.log(bestSum(7, [5, 3, 4, 7]), [7]);
console.log(bestSum(8, [2, 3, 5]), [3, 5]);
console.log(bestSum(8, [1, 4, 5]), [4, 4]);
console.log(bestSum(100, [1, 2, 5, 25]), [25, 25, 25, 25]);