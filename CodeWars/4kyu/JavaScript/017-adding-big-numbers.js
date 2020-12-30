// https://www.codewars.com/kata/525f4206b73515bffb000b21
// We need to sum big numbers and we require your help.
// Write a function that returns the sum of two numbers. The input numbers are strings and the function must return a string.

function add(x, y) {

    let result = '';

    // get the length the longest
    let length = Math.max(x.length, y.length);

    // padd with zeros
    x = x.padStart(length, '0');
    y = y.padStart(length, '0');

    let remainder = 0;
    let sum;

    // loop from right to left the inputs
    for (let i = length - 1; i >= 0; i--) {
        let a = x[i];
        let b = y[i];

        // sum the letters and previous remainder
        sum = +a + +b + remainder;

        // if result > 9 then get the remainder and add to the next
        result = sum % 10 + result;
        remainder = Math.floor(sum / 10);
    }

    return remainder === 0 ? result : remainder + result;
}

console.log(add("123", "321"), "444");
console.log(add("11", "99"), "110");
console.log(add("1", "1"), "2");
console.log(add("123", "456"), "579");
console.log(add("888", "222"), "1110");
console.log(add("1372", "69"), "1441");
console.log(add("12", "456"), "468");
console.log(add("101", "100"), "201");
console.log(add('63829983432984289347293874', '90938498237058927340892374089'), "91002328220491911630239667963")