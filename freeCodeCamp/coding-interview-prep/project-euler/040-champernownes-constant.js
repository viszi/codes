// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-40-champernownes-constant
// An irrational decimal fraction is created by concatenating the positive integers:
// 0.123456789101112131415161718192021...
// It can be seen that the 12th digit of the fractional part is 1.
// If dn represents the nth digit of the fractional part, find the value of the following expression.
// d1 × d10 × d100 × d1000 × d10000 × d100000 × d1000000

// brute-force
function champernownesConstant(n) {

    let digits = '.';
    // create the a string by concatenating the numbers
    let i = 1;
    while (digits.length < n + 1) {
        digits += i;
        i++;
    }

    let result = 1;
    let digitsArr = [1];
    for (let c = 1; c <= Math.log10(n); c++) {
        digitsArr.push(+digits[10 ** c]);
        result *= +digits[10 ** c];
    }

    console.log(digitsArr);
    return result;
}

// // mathy way?
// function champernownesConstant(n) {

//     // number length 
//     // 1-9
//     // 10-99 
//     let c = n;
//     let r = 0;

//     switch (true) {
//         case c < 10:
//             return n;
//         case c < 190:
//             c -= 9;                  // forget the first 9 chars
//             r = c % 2;              // 
//             c = Math.floor(c / 2);  // each number is 2 char long
//             if (r === 0) {
//                 return (c + 9).toString().substring(1, 2);
//             } else {
//                 return (c + 10).toString().substring(0, 1);
//             }
//         case c < 1990:
//             c -= 9;
//             r = c % 3;
            
//     }

//     return result;
// }

console.log(champernownesConstant(10), 1);
console.log(champernownesConstant(100), 5);
console.log(champernownesConstant(1000), 15);
console.log(champernownesConstant(1000000), 210);