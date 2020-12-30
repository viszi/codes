// https://www.codewars.com/kata/523f5d21c841566fde000009
// Your goal in this kata is to implement a difference function, which subtracts one list from another and returns the result.
// It should remove all values from list a, which are present in list b.
// arrayDiff([1,2,2,2,3],[2]) == [1,3]

function arrayDiff(a, b) {
    //create a set of b array
    let filteringValues = new Set(b);

    return a.filter(value => !filteringValues.has(value))
}

console.log(arrayDiff([], [4, 5]), [], "a was [], b was [4,5]");
console.log(arrayDiff([3, 4], [3]), [4], "a was [3,4], b was [3]");
console.log(arrayDiff([1, 8, 2], []), [1, 8, 2], "a was [1,8,2], b was []");