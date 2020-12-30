// https://www.codewars.com/kata/5518a860a73e708c0a000027
// For a given list [x1, x2, x3, ..., xn] compute the last (decimal) digit of x1 ^ (x2 ^ (x3 ^ (... ^ xn))).
// lastDigit [3, 4, 2] == 1
// because 3 ^ (4 ^ 2) = 3 ^ 16 = 43046721.
// Corner cases: we assume that 0 ^ 0 = 1 and that lastDigit of an empty list equals to 1.

// 0 always returns 0
// 1 always returns 1
// 2 rotates between 2, 4, 8, 6....
// 3 rotates between 3, 9, 7, 1....
// 4 rotates between 4, 6....
// 5 always returns 5
// 6 always returns 6
// 7 rotates between 7, 9, 3, 1....
// 8 rotates between 8, 4, 2, 6....
// 9 rotates between 9, 1....


function lastDigit(as) {

    const DIGITS = {
        '0': [0],
        '1': [1],
        '2': [6, 2, 4, 8],
        '3': [1, 3, 9, 7],
        '4': [6, 4],
        '5': [5],
        '6': [6],
        '7': [1, 7, 9, 3],
        '8': [6, 8, 4, 2],
        '9': [1, 9]
    }

    // handle insufficient input
    if (as.length < 2) {
        return 1;
    }

    // determine the base number
    const base = as.shift();

    // get the last digit of the base number
    const last = base % 10;

    // determine the exponential 
    // grab the last element of the array
    let exponential = as.pop();

    if (as.length > 1) {
        //loop through the array, but stop before the first item
        for (i = as.length - 1; i >= 1; i--) {
            if (exponential === 0) {
                exponential = 1;
            } else {
                exponential *= as[i];
            }
        }
    }

    // https://www.youtube.com/watch?v=Y9dFr0_MiU8
    // use logice that 2^1056 = 2^1050 * 2^6
    const exp2 = exponential % 10;
    const exp1 = exponential - exp2;

    // get the base of the exponential
    const power = as.pop();
    const unit = power % 10;

    const TENPOWERENDINGS = {
        '0': 00, //0
        '1': 01, //1
        '2': 24, //1024
        '3': 49, //59049
        '4': 76, //1048576
        '5': 25, //9765625
        '6': 76, //60466176
        '7': 49, //282475249
        '8': 24, //1073741824
        '9': 01  //3486784401
    };

    exponential = (TENPOWERENDINGS[unit] * Math.pow(unit, exp2).toString().slice(-2)) % 4;

    // if (exponential === 0) {
    //     return 1;
    // }

    const reps = DIGITS[last].length;

    if (reps === 1) {
        return DIGITS[last][0];
    } else {
        const pattern = exponential % reps;
        return DIGITS[last][pattern];
    }

}


// console.log(lastDigit([]), 1);
console.log(lastDigit([0, 0]), 1);
console.log(lastDigit([0, 0, 0]), 0);
// console.log(lastDigit([1, 2]), 1);
// console.log(lastDigit([3, 4, 5]), 1);
// console.log(lastDigit([4, 3, 6]), 4);
// console.log(lastDigit([7, 6, 21]), 1);
// console.log(lastDigit([12, 30, 21]), 6);
console.log(lastDigit([2, 2, 2, 0]), 4);
console.log(lastDigit([937640, 767456, 981242]), 0);
console.log(lastDigit([123232, 694022, 140249]), 6);
console.log(lastDigit([499942, 898102, 846073]), 6);