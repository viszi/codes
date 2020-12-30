// https://www.codewars.com/kata/58a664bb586e986c940001d5
// Your task is to find the missing letter(s). You may need to output them by the order a-z. It is possible that there is more than one missing letter from more than one set of alphabet.
// If the string contains all of the letters in the alphabet, return an empty string ""
// For s='abcdefghijklmnopqrstuvwxy'
// The result should be 'z'
// For s='aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyy'
// The result should be 'zz'

function missingAlphabets(s) {

    //find out how many sets do we have by counting letters of the input and store them in an object
    let letters = {};

    for (let i = 0; i < s.length; i++) {
        let letter = s[i];

        letters[letter] = letters[letter] || 0;
        letters[letter] += 1;
    };

    //find the max occurences in the object
    let maxset = 0;
    for (letter in letters) {
        if (letters[letter] > maxset) {
            maxset = letters[letter];
        }
    };

    //full string
    let base = 'abcdefghijklmnopqrstuvwxyz';

    //place where missing letters are stored
    let missing_letters = '';

    //loop through the full a-z range and if a letter is missing add to result
    for (let i = 0; i < base.length; i++) {
        letter = base[i];
        missing = maxset - (letters[letter] || 0);
        if (missing > 0) {
            missing_letters += letter.repeat(missing);
        }
    };

    return missing_letters;
}

console.log(missingAlphabets("abcdefghijklmnopqrstuvwxy"), "z");
console.log(missingAlphabets("abcdefghijklmnopqrstuvwxyz"), "");
console.log(missingAlphabets("aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyy"), "zz");
console.log(missingAlphabets("abbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxy"), "ayzz");
console.log(missingAlphabets("codewars"), "bfghijklmnpqtuvxyz");