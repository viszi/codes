// https://www.codewars.com/kata/56747fd5cb988479af000028
// You are going to be given a word. Your job is to return the middle character of the word. If the word's length is odd, 
// return the middle character. If the word's length is even, return the middle 2 characters.
// Kata.getMiddle("test") should return "es"
// Kata.getMiddle("testing") should return "t"
// Kata.getMiddle("middle") should return "dd"
// Kata.getMiddle("A") should return "A"

function getMiddle(s) {
    let middle = Math.floor(s.length / 2);
    let even = s.length % 2 === 0;

    return (even ? s.charAt(middle - 1) : '') + s.charAt(middle)
}


console.log(getMiddle("test"), "es");
console.log(getMiddle("testing"), "t");
console.log(getMiddle("middle"), "dd");
console.log(getMiddle("A"), "A");