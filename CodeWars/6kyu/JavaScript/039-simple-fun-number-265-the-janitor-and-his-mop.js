// https://www.codewars.com/kata/59128363e5bc24091a00006f
// For word = "abacaba", the output should be:
// [7, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// (26 elements altogether)
// First element 7 means: from first "a" to last "a" need a width of 7.
// First element 5 means: from first "b" to last "b" need a width of 5.
// First element 1 means: from first "c" to last "c" need a width of 1.

function theJanitor(str) {
    const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return ALPHABET.map(letter => str.includes(letter) ? 1 + str.lastIndexOf(letter) - str.indexOf(letter) : 0);
}

console.log(theJanitor("abacaba"),[7, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
console.log(theJanitor("likemm"),[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
console.log(theJanitor("rkuhsxtflzvytbtwxyarsglibmhfmmikyolfmopbtkzxezjahq"),[30, 27, 0, 0, 1, 29, 1, 46, 8, 1, 41, 27, 12, 0, 5, 1, 1, 20, 17, 35, 1, 1, 1, 39, 22, 37]);
console.log(theJanitor("ommnommnomm"),[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);