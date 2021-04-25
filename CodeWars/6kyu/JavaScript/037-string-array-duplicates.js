// https://www.codewars.com/kata/59f08f89a5e129c543000069
// In this Kata, you will be given an array of strings and your task is to remove all consecutive duplicate letters from each string in the array.

// dup(["abracadabra","allottee","assessee"]) = ["abracadabra","alote","asese"].

// dup(["kelless","keenness"]) = ["keles","kenes"].

// Strings will be lowercase only, no spaces. See test cases for more examples.

function dup(arr) {
    return arr.map(str => {
        let newStr = '';
        for (let i = 0; i < str.length; i++) {
            if (str[i] !== str[i + 1]) {
                newStr += str[i];
            }
        }
        return newStr;
    });
}

console.log(dup(["aabracadabra", "allottee", "assessee"]));
console.log(dup(["kelless", "keenness"]));