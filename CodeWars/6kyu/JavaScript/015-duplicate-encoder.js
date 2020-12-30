// https://www.codewars.com/kata/54b42f9314d9229fd6000d9c
// The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if 
// that character appears only once in the original string, or ")" if that character appears more than once in the original string. 
// Ignore capitalization when determining if a character is a duplicate.
// "din"      =>  "((("
// "recede"   =>  "()()()"
// "Success"  =>  ")())())"
// "(( @"     =>  "))((" 


function duplicateEncode(word) {
    //create object which will store unique characters and their counts
    let chars = {};

    //count the occurences of characters
    for (let i = 0; i < word.length; i++) {
        let letter = word[i].toLowerCase();

        chars[letter] = chars[letter] || 0;
        chars[letter] += 1;
    }

    let result = '';

    //create result string with the help of the created object
    for (let i = 0; i < word.length; i++) {
        let letter = word[i].toLowerCase();

        if (chars[letter] === 1) {
            result += '('
        } else {
            result += ')'
        }
    }

    return result;
}

function duplicateEncode(word) {
    //convert input to lowercase
    let lowCase = word.toLowerCase();

    //create result string with the help of the created object
    let result = '';
    
    //loop through the string
    for (let i = 0; i < lowCase.length; i++) {
        let letter = lowCase[i];
        
        //check if the currently checked letter can be found somewhere else in the string
        if ( i === lowCase.indexOf(letter) && i === lowCase.lastIndexOf(letter)) {
            result += '('
        } else {
            result += ')'
        }
    }

    return result
}

console.log(duplicateEncode("din"), "(((");
console.log(duplicateEncode("recede"), "()()()");
console.log(duplicateEncode("Success"), ")())())", "should ignore case");
console.log(duplicateEncode("(( @"), "))((");
