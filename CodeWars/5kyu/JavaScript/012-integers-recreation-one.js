// https://www.codewars.com/kata/55aa075506463dac6600010d
// Divisors of 42 are : 1, 2, 3, 6, 7, 14, 21, 42. These divisors squared are: 1, 4, 9, 36, 49, 196, 441, 1764. The sum of the squared divisors is 2500 which is 50 * 50, a square!
// Given two integers m, n (1 <= m <= n) we want to find all integers between m and n whose sum of squared divisors is itself a square. 42 is such a number.
// The result will be an array of arrays or of tuples (in C an array of Pair) or a string, each subarray having two elements, first the number whose squared divisors is a square and then the sum of the squared divisors.
// list_squared(1, 250) --> [[1, 1], [42, 2500], [246, 84100]]
// list_squared(42, 250) --> [[42, 2500], [246, 84100]]

function listSquared(m, n) {

    let result = [];

    //find divisors of numbers between m and n
    //once all divisors were found square them and check if it is a square number
    for (let i = m; i <= n; i++) {
        let divisors = [1];

        //generate numbers from to 2 to n/2 and check if it is a divisor of the number
        for (let j = 2, max = Math.floor(i / 2); j <= max; j++) {
            if (i % j === 0) {
                divisors.push(j);
            }
        }

        if (i !== 1) {
            divisors.push(i);
        }

        //calculate the squared sum of divisors
        let squared = divisors.map(n => n * n);
        let sum = squared.reduce((s, v) => s += v);

        if (Math.sqrt(sum) == Math.floor(Math.sqrt(sum))) {
            result.push([i, sum]);
        }
    }
    return result
}


// same as above but calculating the square immediately
function listSquared(m, n) {

    let result = [];
    for (let i = m; i <= n; i++) {
        let squared_divisors = [1];

        for (let j = 2, max = Math.floor(i / 2); j <= max; j++) {
            if (i % j === 0) {
                squared_divisors.push(j * j);
            }
        }

        if (i !== 1) {
            squared_divisors.push(i * i);
        }

        //calculate the squared sum of divisors
        let sum = squared_divisors.reduce((s, v) => s += v);

        if (Number.isInteger(Math.sqrt(sum))) {
            result.push([i, sum]);
        }
    }
    return result
}


console.log(listSquared(1, 250), [[1, 1], [42, 2500], [246, 84100]]);
console.log(listSquared(42, 250), [[42, 2500], [246, 84100]]);
console.log(listSquared(250, 500), [[287, 84100]]);

