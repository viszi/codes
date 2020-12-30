// https://www.codewars.com/kata/5a24a35a837545ab04001614
// In this kata, your task is to implement what I call Interlaced Spiral Cipher (ISC).
// Encoding a string using ISC is achieved with the following steps:
// Form a square large enough to fit all the string characters
// Starting with the top-left corner, place string characters in the corner cells moving in a clockwise direction
// After the first cycle is complete, continue placing characters in the cells following the last one in its respective row/column
// When the outer cells are filled, repeat steps 2 through 4 for the remaining inner squares (refer to the example below for further clarification)
// Fill up any unused cells with a space character and return the rows joined together.
// /* Encoding sequence for a 5 x 5 square:
// [ 1  5  9 13  2]
// [16 17 21 18  6]
// [12 24 25 22 10]
// [ 8 20 23 19 14]
// [ 4 15 11  7  3]
// */

function encode(phrase1) {
    const size = Math.ceil(Math.sqrt(phrase1.length));

    let matrix = Array(size * size);

    let row = 0;
    let column = 0;
    for (let i = 0; i < phrase1.length; i++) {
        const index = row * size + column;
        matrix[index] = phrase1[i];
        
        switch (i % 4) {
            case 0:
                column++
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }

    }

    return true;
}
console.log(encode("123456789ABCDEFGHIJKLMNOP"));
// console.log(encode('Romani ite domum'));
//console.log(encode('Stsgiriuar i ninmd l otac'));