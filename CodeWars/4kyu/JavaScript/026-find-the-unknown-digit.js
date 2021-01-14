// https://www.codewars.com/kata/546d15cebed2e10334000ed9
// You are helping an archaeologist decipher some runes. He knows that this ancient society used a Base 10 system, and that they never start a number with a leading zero. He's figured out most of the digits as well as a few operators, but he needs your help to figure out the rest.
// The professor will give you a simple math expression, of the form
// [number][op][number]=[number]
// He has converted all of the runes he knows into digits. The only operators he knows are addition (+),subtraction(-), and multiplication (*), so those are the only ones that will appear. Each number will be in the range from -1000000 to 1000000, and will consist of only the digits 0-9, possibly a leading -, and maybe a few ?s. If there are ?s in an expression, they represent a digit rune that the professor doesn't know (never an operator, and never a leading -). All of the ?s in an expression will represent the same digit (0-9), and it won't be one of the other given digits in the expression. No number will begin with a 0 unless the number itself is 0, therefore 00 would not be a valid number.
// Given an expression, figure out the value of the rune represented by the question mark. If more than one digit works, give the lowest one. If no digit works, well, that's bad news for the professor - it means that he's got some of his runes wrong. output -1 in that case.
// Complete the method to solve the expression to find the value of the unknown rune. The method takes a string as a paramater repressenting the expression and will return an int value representing the unknown rune or -1 if no such rune exists.

function solveExpression(exp) {
    //split up the input by equal sign '='
    [left, right] = exp.split('=');

    for (let x = 0; x < 10; x++) {        
        // skip 'x' if it is already in the string
        if (left.includes(x) || right.includes(x)) continue;

        // replace '?' with 'x' value
        let leftNumber = left.replace(/\?/g,x);
        let rightNumber = right.replace(/\?/g,x);

        // 0... numbers are not allowed
        const zeroTest = input => {
            const re = new RegExp('^0.');
            return input.split(/[\+\-\*]/).some(val => re.test(val));
        }
        if (zeroTest(leftNumber) || zeroTest(rightNumber)) continue;

        // replace '++' or '--' with '+'
        leftNumber = leftNumber.replace(/\+\+|\-\-/g, '+');
        rightNumber = rightNumber.replace(/\+\+|\-\-/g, '+');

        // evaluate the generated numbers
        if (eval(leftNumber) === eval(rightNumber)) return x;
    }
    return -1;
}

console.log(solveExpression('1+1=?'), 2);
console.log(solveExpression('123*45?=5?088'), 6);
console.log(solveExpression('-5?*-1=5?'), 0);
console.log(solveExpression('19--45=5?'), -1);
console.log(solveExpression('??*??=302?'), 5);
console.log(solveExpression('?*11=??'), 2);
console.log(solveExpression('??*1=??'), 2);
console.log(solveExpression('??+??=??'), -1);
