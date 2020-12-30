// https://www.codewars.com/kata/5f3afc40b24f090028233490
// Your job is to change the string s using a non-negative integer n.
// Each bit in n will specify whether or not to swap the case for each alphabetic character in s. When you get to the last bit of n, 
// circle back to the first bit. If the bit is 1, swap the case. If its 0, don't swap the case.
// You should skip the checking of bit when a non-alphabetic character is encountered, but they should be preserved in their original positions.
// For example,
// swap('Hello world!', 11) == 'heLLO wORLd!'
// # because bin(11) is 1011 so the first, third, fourth, fifth, seventh, eighth, and ninth alphabetical characters have cases swapped
// 'H e l l o  w o r l d !'
// '1 0 1 1 1  0 1 1 1 0'
// '^   ^ ^ ^    ^ ^ ^   '

function swap(s, n) {

    const mask = n.toString(2);
    const maskLength = mask.length;
    let counter = -1;

    let result = '';
    for (let i = 0; i < s.length; i++) {
        const letter = s[i];

        if (letter.match(/\w/)) {
            counter++;

            if (mask[counter % maskLength] == 1) {
                result += (letter.toLowerCase() === letter) ? letter.toUpperCase() : letter.toLowerCase()
            } else {
                result += letter;
            }
        } else {
            result += letter;
        }
    }

    return result;
}

// same as above but with array higher methods (map)
function swap(s, n) {

    const mask = n.toString(2);
    const maskLength = mask.length;
    let counter = -1;

    return s
        .split('')
        .map(letter => {
            if (letter.match(/\w/)) {
                counter++;

                if (mask[counter % maskLength] == 1) {
                    result += (letter.toLowerCase() === letter) ? letter.toUpperCase() : letter.toLowerCase()
                } else {
                    result += letter;
                }
            } else {
                result += letter;
            }
        })
        .join('');
}

// same as above but with array higher methods (reduce)
function swap(s, n) {

    const mask = n.toString(2);
    const maskLength = mask.length;
    let counter = -1;

    return s
        .split('')
        .reduce((result, letter) => {
            if (letter.match(/\w/)) {
                counter++;

                if (mask[counter % maskLength] == 1) {
                    result += (letter.toLowerCase() === letter) ? letter.toUpperCase() : letter.toLowerCase()
                } else {
                    result += letter;
                }
            } else {
                result += letter;
            }
            return result;
        }, '');
}

console.log(swap('Hello world!', 11), 'heLLO wORLd!');
console.log(swap("gOOd MOrniNg", 7864), 'GooD MorNIng');
console.log(swap('', 11345), '');
console.log(swap('the lord of the rings', 0), 'the lord of the rings');