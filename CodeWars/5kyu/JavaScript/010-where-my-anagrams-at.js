// https://www.codewars.com/kata/523a86aa4230ebb5420001e1
// Write a function that will find all the anagrams of a word from a list. You will be given two inputs a word and an array with words. You should return an array of all the anagrams or an empty array if there are none. For example:
// anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) => ['aabb', 'bbaa']
// anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) => ['carer', 'racer']
// anagrams('laser', ['lazing', 'lazy',  'lacer']) => []

function anagrams(word, words) {
    //sort the word in alaphabetical order
    let original = word.split('').sort().join('');

    return words.filter(element => {
        let anagram = element.split('').sort().join('');
        if (original == anagram) {
            return element
        }
    });

}

function anagrams(word, words) {
    //sort the word in alaphabetical order
    const original = word.split('').sort().join('');

    //smaller version of filter
    return words.filter(element => element.split('').sort().join('') === original);

}

function anagrams(word, words) {
    //create an object from the word, store the occurence of letters in the object
    let original = {};

    //add to the object the letters and count theis occurences
    for (let i = 0, n = word.length; i < n; i++) {
        let char = word[i];

        original[char] = original[char] || 0;
        original[char]++;
    }

    //loop thorugh the words and count check one by one their letters
    return words.filter(element => {
        //create a copy from the object which contains the original word letters
        //let copy = Object.assign({}, original);
        let copy = {...original};
        

        for (let i = 0, n = element.length; i < n; i++) {
            let letter = element[i];
            //check if we can see the letter in the object
            if (copy[letter] > 0) {
                copy[letter]--;
            } else {
                return false
            }
        }
        //if all letters were found than this is anagram
        return true

    });

    return copy

}


console.log(anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']), ['aabb', 'bbaa']);
console.log(anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']), ['carer', 'racer']);
console.log(anagrams('laser', ['lazing', 'lazy', 'lacer']), []);