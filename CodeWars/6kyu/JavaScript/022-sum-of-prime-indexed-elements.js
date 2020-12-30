// https://www.codewars.com/kata/59f38b033640ce9fc700015b
// In this Kata, you will be given an integer array and your task is to return the sum of elements occupying prime-numbered indices.
// The first element of the array is at index 0.


function total(arr) {
    // return obvious
    if (arr.length === 0) return 0;

    // generate primes number until array length
    let primes = new Uint8Array(arr.length);
    primes[0] = 1;
    primes[1] = 1;   
    for (let i = 2; i < arr.length; i++) {
        if (primes[i] === 0) {
            for (let j = i + i; j < arr.length; j += i) {
                primes[j] = 1;
            }
        }
    }

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (primes[i] === 0) {
            sum += arr[i];
        }
    }
    return sum;
};


// moved the two for loops into a single one
function total(arr) {
    // return obvious
    if (arr.length === 0) return 0;

    // generate primes number until array length
    let primes = new Uint8Array(arr.length);
    primes[0] = 1; primes[1] = 1;   // set 0 and 1 as non prime

    let sum = 0;
    for (let i = 2; i < arr.length; i++) {
        if (primes[i] === 0) {
            for (let j = i + i; j < arr.length; j += i) {
                primes[j] = 1;
            }
            sum += arr[i];
        }
    }

    return sum;
};


console.log(total([]), 0);
console.log(total([1, 2, 3, 4]), 7);
console.log(total([1, 2, 3, 4, 5, 6]), 13);
console.log(total([1, 2, 3, 4, 5, 6, 7, 8]), 21);
console.log(total([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), 21);
console.log(total([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), 33);
console.log(total([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]), 47);
