// https://www.codewars.com/kata/5ba47374b18e382069000052
// Given an array of integers, find the minimum number of elements to remove from the array so that the square root of the largest integer in the array is less or equal to the smallest number in the same array.
// x = smallest integer in the array
// y = largest integer in the array
// Find the minimum number of elements to remove so, √y ≤ x.
// A = {3, 6, 5, 9, 16}
// min=3 max=16
// remove 16, so largest element becomes 9.
// √9 ≤ 3

function minRemove(arr) {
    let y = Math.max(...arr);
    let x = Math.min(...arr);

    if (x === y) return 0;

    let deletes = 0;
    while (Math.sqrt(y) > x) {
        // second smallest
        const posX = arr.indexOf(x);
        let newArrX = arr.filter((_, i) => i !== posX);
        const x2 = Math.min(...newArrX);

        // second highest
        const posY = arr.indexOf(y);
        newArrY = arr.filter((_, i) => i !== posY);
        const y2 = Math.max(...newArrY);

        // remove that where the step will be bigger
        if (Math.sqrt(y) - x >= Math.sqrt(y2) - x) {
            console.log(`y - step: ${deletes} - x: ${x} - x2: ${x2} - y: ${y} - y2: ${y2} - x-y diff: ${Math.sqrt(y) - x} - x2-y2 diff: ${Math.sqrt(y2) - x2}`);
            arr = newArrY.slice();
            y = y2;
        } else {
            console.log(`y - step: ${deletes} - x: ${x} - x2: ${x2} - y: ${y} - y2: ${y2} - x-y diff: ${Math.sqrt(y) - x} - x2-y2 diff: ${Math.sqrt(y2) - x2}`);
            arr = newArrX.slice();
            x = x2;
        }
        deletes++;
    }
    return deletes;
}

//console.log(minRemove([3, 6, 5, 9, 16]), 1);
// console.log(minRemove([9, 13, 21, 1, 3, 5, 7]), 2);
// console.log(minRemove([9, 13, 21, 1, 3, 3, 7]), 3);
// console.log(minRemove([6, 25, 35, 38]), 1);
console.log(minRemove([1, 3, 1, 2, 2, 5, 5, 5, 2, 2]), 5);
// console.log(minRemove([1, 3, 1, 1, 3, 3, 5, 5, 1, 2, 2, 1, 2, 2, 5, 5, 5, 2, 2]), 10);
