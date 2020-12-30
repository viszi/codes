// https://www.codewars.com/kata/5727bb0fe81185ae62000ae3
// Assume "#" is like a backspace in string. This means that string "a#bc#d" actually is "bd"
// Your task is to process a string with "#" symbols.

function cleanString(s) {
    // loop through a string and 
    // add non # to an array
    // when # is found pop the last element of the array
    // convert the array to a string
    
    let result = [];

    s.split('').map(letter => {
        if (letter == "#")  {
            result.pop();
        } else {
            result.push(letter);
        }
    });
    
    return result.join('');

};

// mások megoldása
function clean_string(s) {
    const result = []
    for (const c of s) {
      if (c === "#") {
        result.pop()
      } else {
        result.push(c)
      }
    }
    return result.join("")
  }

console.log(cleanString('abc#d##c')); //== "ac");
console.log(cleanString('abc####d##c#')); //== "" );