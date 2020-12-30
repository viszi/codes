// https://www.codewars.com/kata/57a62154cf1fa5b25200031e
// Write function alternateCase which switch every letter in string from upper to lower and from lower to upper. E.g: Hello World -> hELLO wORLD

function alternateCase(s) {

  return s.split("").map(function convert(letter) {
    return letter == letter.toLowerCase() ? letter.toUpperCase() : letter.toLowerCase();
  }
  ).join("");
}

// same as above but with arrow function
function alternateCase(s) {
  return s.split("").map(letter => (letter == letter.toLowerCase()) ? letter.toUpperCase() : letter.toLowerCase()).join("");
}

// same as above but in this case string is not converted to array, but we are calling on the object the map function
function alternateCase(s) {

  let map = Array.prototype.map
  return map.call(s, letter => (letter == letter.toLowerCase()) ? letter.toUpperCase() : letter.toLowerCase()).join("");

}

console.log(alternateCase("abc")); //== "ABC");
console.log(alternateCase("ABC")); //== "abc");
console.log(alternateCase("Hello World")); //== "hELLO wORLD");