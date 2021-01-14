// https://www.codewars.com/kata/52d1bd3694d26f8d6e0000d3
// The Vigenère cipher is a method of encrypting alphabetic text by using a series of different Caesar ciphers based on the letters of a keyword. It is a simple form of polyalphabetic substitution.
// In a Caesar cipher, each letter of the alphabet is shifted along some number of places; for example, in a Caesar cipher of shift 3, A would become D, B would become E, Y would become B and so on. The Vigenère cipher consists of several Caesar ciphers in sequence with different shift values.
// Assume the key is repeated for the length of the text, character by character. Note that some implementations repeat the key over characters only if they are part of the alphabet -- this is not the case here.

// The shift is derived by applying a Caesar shift to a character with the corresponding index of the key in the alphabet.

// Write a class that, when given a key and an alphabet, can be used to encode and decode from the cipher.

// Example
// var alphabet = 'abcdefghijklmnopqrstuvwxyz';
// var key = 'password';

// // creates a cipher helper with each letter substituted
// // by the corresponding character in the key
// var c = new VigenèreCipher(key, alphabet);

// c.encode('codewars'); // returns 'rovwsoiv'
// c.decode('laxxhsj');  // returns 'waffles'

function VigenèreCipher(key, abc) {
    const chipherLength = key.length;

    this.encode = function (str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            // get the letter from input which needs to be encoded
            const letter = str[i];
            // get the letter at the same position from key
            const chipherLetter = key[i % chipherLength];
            // get the index of the chipherLetter as per the given alphabet
            const shift = abc.indexOf(chipherLetter);

            const letterPosition = abc.indexOf(letter);

            if (letterPosition === -1) {
                result += letter;
            } else {
                result += abc[(letterPosition + shift) % abc.length];
            }
        }
        return result;
    };

    this.decode = function (str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            // get the letter from input which needs to be decoded
            const letter = str[i];
            // get the letter at the same position from key
            const chipherLetter = key[i % chipherLength];
            // get the index of the chipherLetter as per the given alphabet
            const shift = abc.indexOf(chipherLetter);

            const letterPosition = abc.indexOf(letter);

            if (letterPosition === -1) {
                result += letter;
            } else {
                const newPosition = letterPosition - shift;
                result += abc[newPosition >= 0 ? newPosition : abc.length + newPosition];
            }
        }
        return result;
    };
}

var abc, key;
abc = "abcdefghijklmnopqrstuvwxyz";
key = "password"
c = new VigenèreCipher(key, abc);

console.log(c.encode('codewars'), 'rovwsoiv');
console.log(c.decode('rovwsoiv'), 'codewars');

console.log(c.encode('waffles'), 'laxxhsj');
console.log(c.decode('laxxhsj'), 'waffles');

console.log(c.encode('CODEWARS'), 'CODEWARS');
console.log(c.decode('CODEWARS'), 'CODEWARS');
