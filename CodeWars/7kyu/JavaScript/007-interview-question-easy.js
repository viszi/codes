// https://www.codewars.com/kata/5b358a1e228d316283001892
// You receive the name of a city as a string, and you need to return a string that shows how many times each letter shows up in the string by using an asterisk (*).
// For example: "Chicago"  -->  "c:**,h:*,i:*,a:*,g:*,o:*"

function getStrings(city) {
    // add all letters into an object where key is the letter and property is count
    let letters = {};

    for (let i = 0; i < city.length; i++) {
        // convert to lowercase        
        letter = city[i].toLowerCase();

        // if letter is already in object increase the counter otherwise set to 1
        if (letters[letter]) {
            letters[letter] += 1
        } else {
            letters[letter] = 1;
        }
    }

    let result = "";

    // iterate over the object and append to result the key and * based on the counter
    for (letter in letters) {

        // skip space from the result
        if (letter != " ") {
            result = result + letter + ":" + "*".repeat(letters[letter]) + ","
        }
    }

    // remove the last unnecessary comma
    return result.slice(0, result.length - 1);

}

console.log(getStrings("Chicago") == "c:**,h:*,i:*,a:*,g:*,o:*");
console.log(getStrings("Bangkok") == "b:*,a:*,n:*,g:*,k:**,o:*");
console.log(getStrings("Las Vegas") == "l:*,a:**,s:**,v:*,e:*,g:*");