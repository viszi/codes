// https://www.codewars.com/kata/589d581680458f695200008e
// Your task is to find the maximum possible number that can remain in the array after multiple such operations.
// For arr = [1, 3, 2], the result should be 9.
// in order to maximize the answer the first operation will be 1 + 2 (the array changes into [3, 3]) and the next 3 * 3 (the array changes into [9]), so the final result is 9.


function sumOrProduct(arr) {
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) {
        if (Math.min(...arr) < 2) return arr[0] + arr[1];
        return arr[0] * arr[1];
    }

    const max = Math.max(...arr);
    const indexMax = arr.indexOf(max);
    arr.splice(indexMax, 1);

    return max > 1 ? max * sumOrProduct(arr) : max + sumOrProduct(arr)
}

console.log(sumOrProduct([1, 3, 2]), 9);
console.log(sumOrProduct([1, 2, 1]), 4);
console.log(sumOrProduct([1, 1, 1]), 3);
console.log(sumOrProduct([1]), 1);
console.log(sumOrProduct([9]), 9);
console.log(sumOrProduct([1, 1]), 2);
console.log(sumOrProduct([5, 1]), 6);
console.log(sumOrProduct([1, 5, 7]), 42);
console.log(sumOrProduct([1, 6, 5]), 36);
console.log(sumOrProduct([1, 1, 5, 7]), 70);
console.log(sumOrProduct([1, 1, 1, 1]), 4);
console.log(sumOrProduct([1, 1, 1, 1, 1]), 6);
console.log(sumOrProduct([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), 1458);
console.log(sumOrProduct([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), 972);
console.log(sumOrProduct([1, 2, 1, 4, 5]), 80);
console.log(sumOrProduct([10, 20, 30]), 6000);
