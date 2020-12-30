// https://www.codewars.com/kata/54ba84be607a92aa900000f1
// An isogram is a word that has no repeating letters, consecutive or non-consecutive. 
// Implement a function that determines whether a string that contains only letters is an isogram. 
// Assume the empty string is an isogram. Ignore letter case.

function isIsogram(str) {
    // convert to lowercase
    const string = str.toLowerCase();

    // empty string is an isogram'
    if (string == "") return true;

    // split into single chars the string
    let chars = string.split("");

    // create empty array for single chars
    let uniques = [];

    // loop through chars and if to unique if not available yet
    for (let char of chars) {
        if (uniques.indexOf(char) == -1) {
            uniques.push(char);
        }
    }

    if (chars.length == uniques.length) {
        return true;
    } else {
        return false;
    }
}

console.log('Dermatoglyphics: ' + isIsogram("Dermatoglyphics"));
console.log('isogram: ' + isIsogram("isogram"));
console.log('aba: ' + isIsogram("aba"));
console.log('moOse: ' + isIsogram("moOse"));
console.log('isIsogram: ' + isIsogram("isIsogram"));
console.log(':' + isIsogram(""));