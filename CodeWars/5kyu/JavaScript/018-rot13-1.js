// https://www.codewars.com/kata/530e15517bc88ac656000716/
// https://www.codewars.com/kata/52223df9e8f98c7aa7000062/
// ROT13 is a simple letter substitution cipher that replaces a letter with the letter 13 letters after it in the alphabet. ROT13 is an example of the Caesar cipher.

function rot13(message) {
    //create list of the alphabet from where the items will be picked
    const ALPHABET = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    //loop through the string
    //find the current position of the letter and get back the +13 chars
    for (let i = 0, n = message.length; i < n; i++) {
        //get the current letter
        let letter = message[i];
        //get current letter position
        let pos = ALPHABET.indexOf(letter);

        result += pos > -1 ? ALPHABET[pos + 13] : letter;
    }
    return result;
}

function rot13(message) {
    const ALPHABET = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.prototype.map.call(message, letter => {
        let pos = ALPHABET.indexOf(letter);
        return pos > -1 ? ALPHABET[pos + 13] : letter;
    }).join('');
}

function rot13(message) {
    const ALPHABET = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.prototype.reduce.call(message, (result, letter) => {
        let pos = ALPHABET.indexOf(letter);
        return result += pos > -1 ? ALPHABET[pos + 13] : letter;
    },'');
}


console.log(rot13("test"), "grfg");
console.log(rot13("Test"), "Grfg");
console.log(rot13("Ruby is cool!"), "Ehol vf pbby!");
console.log(rot13("10+2 is twelve."), "10+2 vf gjryir.");
console.log(rot13("EBG13 rknzcyr."));