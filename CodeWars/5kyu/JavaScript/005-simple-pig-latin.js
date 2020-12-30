// https://www.codewars.com/kata/520b9d2ad5c005041100000f
// Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.
// pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
// pigIt('Hello world !');     // elloHay orldway !

function pigIt(str){
    let result = '';

    //split up the string into words
    str.split(' ').map(word => {
        // when the word is not a punctuation make the conversion
        if ('.,!?'.indexOf(word) === -1) {
            result += word.slice(1) + word[0] + 'ay ';
        } else {
            result += word;
        }
    })

    return result.trim();
  }

console.log(pigIt('Pig latin is cool'),'igPay atinlay siay oolcay');
console.log(pigIt('This is my string'),'hisTay siay ymay tringsay');