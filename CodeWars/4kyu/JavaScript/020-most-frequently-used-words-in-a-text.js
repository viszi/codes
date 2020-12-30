// https://www.codewars.com/kata/51e056fe544cf36c410000fb
// Write a function that, given a string of text (possibly with punctuation and line-breaks), returns an array of the top-3 most occurring words, in descending order of the number of occurrences.
// Assumptions:
// A word is a string of letters (A to Z) optionally containing one or more apostrophes (') in ASCII. (No need to handle fancy punctuation.)
// Matches should be case-insensitive, and the words in the result should be lowercased.
// Ties may be broken arbitrarily.
// If a text contains fewer than three unique words, then either the top-2 or top-1 words should be returned, or an empty array if a text contains no words.


function topThreeWords(text) {

    const words = text.split(/[ .,/]/);

    let occur = {};

    words.forEach(word => {
        const w = word.toLowerCase();
        if (w.match(/[a-z]/)) {
            occur[w] = (occur[w] || 0) + 1;
        }
    });

    let top1 = 0;
    let top2 = 0;
    let top3 = 0;

    let result = [];

    for (let key in occur) {
        const value = occur[key];
        if (value > top1) {
            top3 = top2;
            top2 = top1;
            top1 = value;
            result.unshift(key);
        } else if (value > top2) {
            top3 = top2;
            top2 = value;
            result.splice(1, 0, key);
        } else if (value > top3) {
            top3 = value;
            result.splice(2, 0, key);
        }
    }

    return result.slice(0, 3);
}


function topThreeWords(text) {

    let result = [, ,];
    let occurences = [0, 0, 0];

    text.split(/[ .,/]/).forEach(word => {
        const numberOfOccurences = text.match(new RegExp(word, 'ig')).length;

        occurences.some((value, index) => {
            if (numberOfOccurences > value) {
                switch (index) {
                    case 0:
                        occurences[index + 2] = occurences[index + 1];
                        occurences[index + 1] = occurences[index];
                        occurences[index] = numberOfOccurences;
                        result[index + 2] = result[index + 1];
                        result[index + 1] = result[index];
                        result[index] = word.toLowerCase();
                        break;
                    case 1:
                        occurences[index + 1] = occurences[index];
                        occurences[index] = numberOfOccurences;
                        result[index + 1] = result[index];
                        result[index] = word.toLowerCase();
                        break;
                    case 2:
                        occurences[index] = numberOfOccurences;
                        result[index] = word.toLowerCase();
                        break;
                }
            }
        })
    });
    return result;
}


console.log(topThreeWords("a a a  b  c c  d d d d  e e e e e"), ['e', 'd', 'a']);
console.log(topThreeWords("a a c b b"), ['a', 'b', 'c']);
console.log(topThreeWords("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e"), ['e', 'ddd', 'aa']);
console.log(topThreeWords("  //wont won't won't "), ["won't", "wont"]);
console.log(topThreeWords("  , e   .. "), ["e"]);
console.log(topThreeWords("  ...  "), []);
console.log(topThreeWords("  '  "), []);
console.log(topThreeWords(`In a village of La Mancha, the name of which I have no desire to call to
mind, there lived not long since one of those gentlemen that keep a lance
in the lance-rack, an old buckler, a lean hack, and a greyhound for
coursing. An olla of rather more beef than mutton, a salad on most
nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
on Sundays, made away with three-quarters of his income.`), ['a', 'of', 'on']);