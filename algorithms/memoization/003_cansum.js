// https://www.youtube.com/watch?v=oBt53YbR9Kk&t=14481s
// write a function that checks if targetsum can be generated from the numbers in the given array

// Memoization
// complexitiy time: o(n^m), space: O(m)    m = targetSum, n = numbers.length

function canSum(targetSum, numbers, memo = {}) {
    if (targetSum in memo) return memo[targetSum];

    if (targetSum === 0) return true;
    if (targetSum < 0) return false;

    for (let num of numbers) {
        const remainder = targetSum - num;
        if (canSum(remainder, numbers, memo) === true) {
            memo[targetSum] = true;
            return true;
        }
    }

    memo[targetSum] = false;
    return false;
}

// Tabulation
// create a table with size targetsum +1, all cells filled with false
// table[0] = true, because 0 can be generated without using any number
// mark in the table values from the number array as true, because they can be generated (e.g. 2, 3)
// move to next element and if 
//             it is false then we should not modify further elements looking by ahead
//             if it is true then mark further elments in distance (2 and 3) marked as true
// if last position is true then it is valid
// 0 1 2 3 4 5 6 7
// T F T T F F F F        1st pass (position 0): 2, 3 marked as true
// T F T T F F F F        2nd pass (position 1): no change, because 1 is false
// T F T T T T T T        3rd pass (position 2): 2 is true, so 2+2 is true and 2+3 is true too and so on
// complexitiy time: o(m*n) // due to 2 inner for loops, space: O(m)    m = targetSum, n = numbers.length

function canSum(targetSum, numbers) {
    const table = Array(targetSum + 1).fill(false);
    table[0] = true;

    for (let i = 0; i <= targetSum; i++) {
        if (table[i] === true) {
            for (let num of numbers) {
                if (i + num <= targetSum) table[i + num] = true;
            }
        }
    }
    return table[targetSum];
}

console.log(canSum(7, [2, 3]), true);
console.log(canSum(7, [5, 3, 4, 7]), true);
console.log(canSum(7, [2, 4]), false);
console.log(canSum(8, [2, 3, 5]), true);
console.log(canSum(300, [7, 14]), false);