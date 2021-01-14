// https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c
// The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array or list of integers:

// maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// // should be 6: [4, -1, 2, 1]
// Easy case is when the list is made up of only positive numbers and the maximum sum is the sum of the whole array. If the list is made up of only negative numbers, return 0 instead.
// Empty list is considered to have zero greatest sum. Note that the empty list or array is also a valid sublist/subarray.

function maxSequence(arr) {

    let maxSums = arr.map((_, i, a) => {
        let subMaxs = [];
        let c = 1;
        // create subarrays from the current position
        while ((i + c) < a.length + 1) {
            subMaxs.push(a.slice(i, i+c).reduce((s, v) => s += v, 0));
            c++;
        }
        return Math.max(0, ...subMaxs);
    })
    //return maxSums;
    return Math.max(0, ...maxSums);
}

console.log(maxSequence([47, 9, -5, -33, -48, 36, -20, -3, -18, 48, 6, 42, -27, -13, 32, 48, 27, 47, 2, -32, 12, 25, 44, -23, -40, 5, -48, -0]), 261);
console.log(maxSequence([]), 0);
console.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
console.log(maxSequence([-42, -33, 4, -42, 24, -31, -12, -36, 34, -38, 45, -38, -6, 3, -3, 4, 9, -47, -29, 12, -40, -37]), 45);