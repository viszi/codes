// https://www.codewars.com/kata/5715eaedb436cf5606000381
// You get an array of numbers, return the sum of all of the positives ones.
// Example [1,-4,7,12] => 1 + 7 + 12 = 20
// Note: if there is nothing to sum, the sum is default to 0.

//1. with for loop
function positiveSum(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];

        if (current >= 0) {
            sum += current;
        }
    }

    return sum
}

//2. with forEach
function positiveSum(arr) {
    let sum = 0;

    arr.forEach(current => {
        if (current > 0) {
            sum += current;
        }
    })

    return sum
}

//3. with filter + map
function positiveSum(arr) {

    let sum = 0;

    arr.filter(current => current > 0).map(current => sum += current);

    return sum
}

//4. with reduce
function positiveSum(arr) {

    return arr.reduce((sum, current) => {
        if (current > 0) {
            return sum += current;
        } else {
            return sum
        }
    }, 0)
}


console.log(positiveSum([1, 2, 3, 4, 5]), 15);
console.log(positiveSum([1, -2, 3, 4, 5]), 13);
console.log(positiveSum([]), 0);
console.log(positiveSum([-1, -2, -3, -4, -5]), 0);
console.log(positiveSum([-1, 2, 3, 4, -5]), 9);