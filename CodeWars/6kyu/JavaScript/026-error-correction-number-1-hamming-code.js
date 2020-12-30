// https://www.codewars.com/kata/5ef9ca8b76be6d001d5e1c3e
// The Hamming Code is used to correct errors, so-called bit flips, in data transmissions. Later in the description follows a detailed explanation of how it works.
// In this Kata we will implement the Hamming Code with bit length 3; this has some advantages and disadvantages:
// [ + ] It's simple to implement
// [ + ] Compared to other versions of hamming code, we can correct more mistakes
// [ - ] The size of the input triples

// Task 1: Encode function
// Implement the encode function, using the following steps:
//  - convert every letter of the text to its ASCII value;
//  - convert ASCII values to 8-bit binary;
//  - triple every bit;
//  - concatenate the result;

// input: "hey"
// --> 104, 101, 121                  // ASCII values
// --> 01101000, 01100101, 01111001   // binary
// --> 000111111000111000000000 000111111000000111000111 000111111111111000000111  // tripled
// --> "000111111000111000000000000111111000000111000111000111111111111000000111"  // concatenated

// Task 2: Decode function:
// Check if any errors happened and correct them. Errors will be only bit flips, and not a loss of bits:

// 111 --> 101 : this can and will happen
// 111 --> 11 : this cannot happen
// Note: the length of the input string is also always divisible by 24 so that you can convert it to an ASCII value.

// Steps:
//  - Split the input into groups of three characters;
//  - Check if an error occurred: replace each group with the character that occurs most often, e.g. 010 --> 0, 110 --> 1, etc;
//  - Take each group of 8 characters and convert that binary number;
//  - Convert the binary values to decimal (ASCII);
//  - Convert the ASCII values to characters and concatenate the result

//  input: "100111111000111001000010000111111000000111001111000111110110111000010111"
// --> 100, 111, 111, 000, 111, 001, ...  // triples
// -->  0,   1,   1,   0,   1,   0,  ...  // corrected bits
// --> 01101000, 01100101, 01111001       // bytes
// --> 104, 101, 121                      // ASCII values
// --> "hey"

function encode(text) {
    let bits = '';

    // loop through the text
    for (let i = 0; i < text.length; i++) {
        // get the current character
        const letter = text[i];

        // find the ascii code for the letters
        const letter_ascii = letter.charCodeAt(0);

        // convert to binary and fill up with leading zeros
        const letter_binary = letter_ascii.toString(2).padStart(8, '0')

        // triple each letter
        for (bin of letter_binary) {
            bits += bin.repeat(3);
        }
    }
    return bits;
}

// same as above but with higher order methods
function encode(text) {
    return text.split('')
        .map(letter => {
            return letter.charCodeAt(0).toString(2).padStart(8, '0')
                .split('')
                .reduce((t, v) => t += v.repeat(3), '');
        })
        .join('');
}


function decode(bits) {

    let text = '';

    for (let i = 0; i < bits.length; i += 24) {
        // get triplet
        const triplet = bits.substring(i, i + 24);

        let letter_binary = '';
        // get 3 values from triplets and find the most occuring
        for (let c = 0; c < triplet.length; c += 3) {
            const sum = +triplet[c] + +triplet[c + 1] + +triplet[c + 2];
            if (sum > 1) {
                letter_binary += '1';
            } else {
                letter_binary += '0';
            }
        }

        // convert binary to decimal (ascii)
        const letter_ascii = parseInt(letter_binary, 2);

        // get letter based on ascii code
        const letter = String.fromCharCode(letter_ascii);

        text += letter;
    }

    return text;
}

// same as above but with regex and higher order methods
function decode(bits) {

    const reg24 = new RegExp('.{24}', 'g')
    const reg3 = new RegExp('.{3}', 'g')

    return bits.match(reg24)
        .map(triplets => {
            return String.fromCharCode(
                parseInt(
                    triplets
                        .match(reg3)
                        .reduce((r, t) => {
                            if (t.length - t.replace(/0/g, '').length > 1) {
                                return r += '0'
                            } else {
                                return r += '1'
                            }
                        }, '')
                    , 2)
            )
        })
        .join('');
}

console.log(encode("hey") == "000111111000111000000000000111111000000111000111000111111111111000000111");
console.log(encode("The Sensei told me that i can do this kata") == "000111000111000111000000000111111000111000000000000111111000000111000111000000111000000000000000000111000111000000111111000111111000000111000111000111111000111111111000000111111111000000111111000111111000000111000111000111111000111000000111000000111000000000000000000111111111000111000000000111111000111111111111000111111000111111000000000111111000000111000000000000111000000000000000000111111000111111000111000111111000000111000111000000111000000000000000000111111111000111000000000111111000111000000000000111111000000000000111000111111111000111000000000000111000000000000000000111111000111000000111000000111000000000000000000111111000000000111111000111111000000000000111000111111000111111111000000000111000000000000000000111111000000111000000000111111000111111111111000000111000000000000000000111111111000111000000000111111000111000000000000111111000111000000111000111111111000000111111000000111000000000000000000111111000111000111111000111111000000000000111000111111111000111000000000111111000000000000111");
console.log(decode("000111111000111000000000000111111000000111000111000111111111111000000111"), "hey");