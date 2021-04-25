// https://www.codewars.com/kata/5dad6e5264e25a001918a1fc
// Explanation of the encoding process:
// input: a string s composed of lowercase letters from "a" to "z", and a positive integer num
// we know there is a correspondence between abcde...uvwxyzand 0, 1, 2 ..., 23, 24, 25 : 0 <-> a, 1 <-> b ...
// if c is a character of s whose corresponding number is x, apply to x the function f: x-> f(x) = num * x % 26, then find ch the corresponding character of f(x)
// Accumulate all these ch in a string r
// concatenate num and r and return the result
// For example:

// encode("mer", 6015)  -->  "6015ekx"

// m --> 12,   12 * 6015 % 26 = 4,    4  --> e
// e --> 4,     4 * 6015 % 26 = 10,   10 --> k
// r --> 17,   17 * 6015 % 26 = 23,   23 --> x

// So we get "ekx", hence the output is "6015ekx"

// Explanation of the encoding process:
// input: a string s composed of lowercase letters from "a" to "z", and a positive integer num
// we know there is a correspondence between abcde...uvwxyzand 0, 1, 2 ..., 23, 24, 25 : 0 <-> a, 1 <-> b ...
// if c is a character of s whose corresponding number is x, apply to x the function f: x-> f(x) = num * x % 26, then find ch the corresponding character of f(x)
// Accumulate all these ch in a string r
// concatenate num and r and return the result
// For example:

// encode("mer", 6015)  -->  "6015ekx"

// m --> 12,   12 * 6015 % 26 = 4,    4  --> e
// e --> 4,     4 * 6015 % 26 = 10,   10 --> k
// r --> 17,   17 * 6015 % 26 = 23,   23 --> x

// So we get "ekx", hence the output is "6015ekx"

function enconde(str, num) {
    let result = '';
    const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

    for(let i = 0; i < str.length; i++) {
        const char = str[i];
        const charCode = char.charCodeAt(0) - 97;
        const code = (charCode * num) % 26;

        result += ALPHABET[code];
    }

    return result;
}

function decode(r) {
    let result = '';
    const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

    // split-up input into number & string
    const pos = r.match(/\D/);

    const num = r.substring(0, pos.index);
    const str = r.substring(pos.index);

    for(let i = 0; i < str.length; i++) {
        const char = str[i];
        const charCode = ALPHABET.indexOf(char);
        const decoder = [...ALPHABET].map((_, index) => {
            return index * num % 26;
        });

        // check if decoder contains only unique values
        const unique = decoder.every((v,i,a) => a.lastIndexOf(v) === i);
        if (!unique) {
            result = 'Impossible to decode';
            break;
        }
        const charPosition = decoder.indexOf(charCode);
        result += ALPHABET[charPosition];
    }

    return result;
}

console.log(enconde('mer', 6015));
console.log(decode('6015ekx'), '=>  mer');
console.log(decode('5057aan'), '=>  Impossible to decode');
console.log(decode("1273409kuqhkoynvvknsdwljantzkpnmfgf"), "=>  uogbucwnddunktsjfanzlurnyxmx");
console.log(decode("1544749cdcizljymhdmvvypyjamowl"), "=>  mfmwhbpoudfujjozopaugcb");
console.log(decode("105860ymmgegeeiwaigsqkcaeguicc"), "=>  Impossible to decode");
console.log(decode("1122305vvkhrrcsyfkvejxjfvafzwpsdqgp"), "=>  rrsxppowmjsrclfljrajtybwviqb");