// https://www.codewars.com/kata/526571aae218b8ee490006f4
// Write a function that takes an integer as input, and returns the number of bits that are equal to one in the binary representation of that number. You can guarantee that input is non-negative.
// Example: The binary representation of 1234 is 10011010010, so the function should return 5 in this case

function countBits(n) {
    //convert n to binary with toString
    const bin = n.toString(2);

    //remove all ZEROs from the string and return the length
    return bin.replace(/0/g, '').length;
}

function countBits(n) {
    return n.toString(2).replace(/0/g, '').length
}

function countBits(n) {
    //convert the number to binary with the standard process and count how many 1s we had
    let counter = 0;

    while (n > 0) {
        n % 2 === 1 ? counter++ : 0;
        n = Math.floor(n / 2);
    }

    return counter;
}


console.log(countBits(0), 0);
console.log(countBits(4), 1);
console.log(countBits(7), 3);
console.log(countBits(9), 2);
console.log(countBits(10), 2);
console.log(countBits(1234), 5);