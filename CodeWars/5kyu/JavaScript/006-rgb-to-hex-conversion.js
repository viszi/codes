// https://www.codewars.com/kata/513e08acc600c94f01000001
// The rgb function is incomplete. Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value.
// Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here.
// rgb(255, 255, 255) // returns FFFFFF
// rgb(255, 255, 300) // returns FFFFFF
// rgb(0,0,0) // returns 000000
// rgb(148, 0, 211) // returns 9400D3


//1. using own number conversion
function rgb(r, g, b) {
    return dec2anybase(r, 16, 0, 255) + dec2anybase(g, 16, 0, 255) + dec2anybase(b, 16, 0, 255)
}

const dec2anybase = (number, base, MIN = -Infinity, MAX = Infinity, PAD = 2) => {
    //if base is not between 2 and 36 then exit
    if (base > 36 || base < 2) return undefined;

    const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    //handle negative numbers
    let sign = '';
    if (number < 0 && MIN < 0) {
        sign = '-';
        number = Math.abs(number);
    };

    //truncate numbers below or above MIN and MAX limit
    if (number <= MIN) return '0'.repeat(PAD);
    if (number >= MAX) return DIGITS.charAt(base - 1).repeat(PAD);

    let output = '';

    while (number != 0) {
        output = DIGITS.charAt(number % base) + output;
        number = Math.floor(number / base);
    }

    return sign + output.padStart(PAD, '0')
}

//2. using toString method
function rgb(r, g, b) {
    return `${dec2hex(r)}${dec2hex(g)}${dec2hex(b)}`
}

const dec2hex = (number) => {
    if (number <= 0) return '00';
    if (number >= 255) return 'FF';
    return number.toString(16).toUpperCase().padStart(2, '0')
};

console.log(rgb(0, 0, 0), '000000');
console.log(rgb(0, 0, -20), '000000');
console.log(rgb(300, 255, 255), 'FFFFFF');
console.log(rgb(173, 255, 47), 'ADFF2F');