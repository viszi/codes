// https://www.codewars.com/kata/52e88b39ffb6ac53a400022e
// Take the following IPv4 address: 128.32.10.1
// This address has 4 octets where each octet is a single byte (or 8 bits).
// 1st octet 128 has the binary representation: 10000000
// 2nd octet 32 has the binary representation: 00100000
// 3rd octet 10 has the binary representation: 00001010
// 4th octet 1 has the binary representation: 00000001
// So 128.32.10.1 == 10000000.00100000.00001010.00000001
// Because the above IP address has 32 bits, we can represent it as the unsigned 32 bit number: 2149583361
// Complete the function that takes an unsigned 32 bit number and returns a string representation of its IPv4 address.


function int32ToIp(number) {
    let output = '';

    while (number != 0) {
        output = number % 2 + output;
        number = Math.floor(number / 2);
    }

    output = output.padStart(32, '0');

    let result = '';

    for (let i = 0; i < 4; i++) {
        let octet = output.substring(8 * i, 8 * (i + 1));

        let decimal = 0;
        for (let j = 0; j < 8; j++) {
            decimal += octet[j] * 2 ** (8 - j - 1);
        }

        if (i < 3) {
            result += decimal + '.';
        } else {
            result += decimal;
        }
    }

    return result;
}

function int32ToIp(number) {
    let output = '';

    while (number != 0) {
        output = number % 2 + output;
        number = Math.floor(number / 2);
    }

    let result = [];

    [...output.padStart(32, '0')]
        .forEach((value, index) => {
            let power = 8 - (index % 8) - 1;

            if (power === 7) {
                sum = 0;
            }
            
            sum += value * 2 ** power;

            if (power === 0) {
                result.push(sum);
            }
        });

        return result.join('.');
}

function int32ToIp(int32){
    return [(int32 & 0xFF000000) >>> 24, 
            (int32 & 0x00FF0000) >>> 16,
            (int32 & 0x0000FF00) >>> 8,
            (int32 & 0x000000FF)].join('.');
  }

console.log(int32ToIp(2149583361));
console.log(int32ToIp(32));
console.log(int32ToIp(0));