// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-28-number-spiral-diagonals
// Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:
// 21 22 23 24 25
// 20  7  8  9 10
// 19  6  1  2 11
// 18  5  4  3 12
// 17 16 15 14 13
// It can be verified that the sum of the numbers on the diagonals is 101.
// What is the sum of the numbers on the diagonals in an n by n spiral formed in the same way?

function spiralDiagonals(n) {

    // index 0 : 1 
    //     +-1 : 3  + 5  +  7 +  9  addition = 2
    //     +-2 : 13 + 17 + 21 + 25  addition = 2*index

    let sum = 1;
    let value = 1;

    for (let i = 1; i < n / 2; i++) {
        let adder = 2 * i;
        
        for (let j = 0; j < 4; j++) {
            value += adder;
            sum += value;
        }
    }

    return sum;
}

console.log(spiralDiagonals(5), 101);
console.log(spiralDiagonals(101), 692101);
console.log(spiralDiagonals(303), 18591725);
console.log(spiralDiagonals(505), 85986601);
console.log(spiralDiagonals(1001), 669171001);