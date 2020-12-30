// https://www.codewars.com/kata/55c04b4cc56a697bb0000048
// Complete the function scramble(str1, str2) that returns true if a portion of str1 characters can be rearranged to match str2, otherwise returns false.
// Only lower case letters will be used (a-z). No punctuation or digits will be included.
// Performance needs to be considered. Input strings s1 and s2 are null terminated.
// scramble('rkqodlw', 'world') ==> True
// scramble('cedewaraaossoqqyt', 'codewars') ==> True
// scramble('katas', 'steak') ==> False

function scramble(str1, str2) {

    let letters = {};

    //create an object from str1 with letters and their occurences
    for (let i = 0, len = str1.length; i < len; i++) {
        let letter = str1[i];

        letters[letter] = letters[letter] || 0;
        letters[letter]++;
    }

    //loop through str2 and check if we have enough occurences from that letter
    for (let i = 0, len = str2.length; i < len; i++) {
        let letter = str2[i];

        if (letters[letter] > 0) {
            letters[letter]--;
        } else {
            return false;
        }
    }
    return true;
}

function scramble(str1, str2) {

    let letters = {};

    // Array.prototype.forEach.call(str1, function(letter) {
    //     letters[letter] = (letters[letter] || 0) + 1
    // });

    Array.prototype.forEach.call(str1, letter => letters[letter] = (letters[letter] || 0) + 1);

    return Array.prototype.every.call(str2, letter => letters[letter] >= 0);
}

console.log(scramble('rkqodlw', 'world'), true);
console.log(scramble('cedewaraaossoqqyt', 'codewars'), true);
console.log(scramble('katas', 'steak'), false);
console.log(scramble('scriptjava', 'javascript'), true);
console.log(scramble('scriptingjava', 'javascript'), true);
console.log(scramble('scriptsjava', 'javascripts'), true);
console.log(scramble('jscripts', 'javascript'), false);
console.log(scramble('aabbcamaomsccdd', 'commas'), true);