// https://www.codewars.com/kata/541c8630095125aba6000c00
// Digital root is the recursive sum of all the digits in a number.
// Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. This is only applicable to the natural numbers.
//     16  -->  1 + 6 = 7
//    942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
// 132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
// 493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2


function digital_root(n) {
    // convert the array the input
    n = n.toString().split('');

    // loop until the array is not a single value
    while (n.length > 1) {
        // use reduce to calculate the sum of all digits in the number
        n = n.reduce((acc, value) => {
            return acc += +value
        },0).toString().split('');
    }

    // return the value as number
    return +n
}


console.log(digital_root(16), 7);
console.log(digital_root(456), 6);
console.log(digital_root(132189), 6);
console.log(digital_root(493193), 2);
