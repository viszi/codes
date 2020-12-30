// https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1
// Write a function that will return the count of distinct case-insensitive alphabetic characters and numeric digits that occur more than once in the input string. The input string can be assumed to contain only alphabets (both uppercase and lowercase) and numeric digits.
// Example
// "abcde" -> 0 # no characters repeats more than once
// "aabbcde" -> 2 # 'a' and 'b'

function duplicateCount(text) {
    //create an object with counting the items in the string
    let letters = {};

    let counter = 0;

    //iterate over the text and check if we have seen the item or not
    for (let i = 0; i < text.length; i++) {
        let letter = text[i].toLowerCase();

        letters[letter] = (letters[letter] || 0) + 1;

        //increase the counter if we have seen the letter the 2nd time
        letters[letter] === 2 ? counter++ : 0;
    }

    return counter;
}

console.log(duplicateCount(""), 0);
console.log(duplicateCount("abcde"), 0);
console.log(duplicateCount("aabbcde"), 2);
console.log(duplicateCount("aabBcde"), 2, "should ignore case");
console.log(duplicateCount("Indivisibility"), 1)
console.log(duplicateCount("Indivisibilities"), 2, "characters may not be adjacent")