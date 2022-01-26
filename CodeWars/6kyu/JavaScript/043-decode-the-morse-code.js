// https://www.codewars.com/kata/decode-the-morse-code
// The Morse code encodes every character as a sequence of "dots" and "dashes". For example, the letter A is coded as ·−, 
// letter Q is coded as −−·−, and digit 1 is coded as ·−−−−. The Morse code is case-insensitive, traditionally capital letters are used. 
// When the message is written in Morse code, a single space is used to separate the character codes and 3 spaces are used to 
// separate words. For example, the message HEY JUDE in Morse code is ···· · −·−−   ·−−− ··− −·· ·.
// NOTE: Extra spaces before or after the code have no meaning and should be ignored.

decodeMorse = function (morseCode) {
    const MORSE = {
        '.-': 'A',
        '-...': 'B',
        '-.-.': 'C',
        '-..': 'D',
        '.': 'E',
        '..-.': 'F',
        '--.': 'G',
        '....': 'H',
        '..': 'I',
        '.---': 'J',
        '-.-': 'K',
        '.-..': 'L',
        '--': 'M',
        '-.': 'N',
        '---': 'O',
        '.--.': 'P',
        '--.-': 'Q',
        '.-.': 'R',
        '...': 'S',
        '-': 'T',
        '..-': 'U',
        '...-': 'V',
        '.--': 'W',
        '-..-': 'X',
        '-.--': 'Y',
        '--..': 'Z',
        '.----': 1,
        '..---': 2,
        '...--': 3,
        '....-': 4,
        '.....': 5,
        '-....': 6,
        '--...': 7,
        '---..': 8,
        '----.': 9,
        '-----': 0,
        '.-.-.-': '.',
        '--..--': ',',
        '..--..': '?',
        '.----.': "'",
        '-.-.--': '!',
        '-..-.': '/',
        '-.--.': '(',
        '-.--.-': ')',
        '.-...': '&',
        '---...': ':',
        '-.-.-.': ';',
        '-...-': "=",
        '.-.-.': '+',
        '-....-': '-',
        '..--.-': '_',
        '.-..-.': '"',
        '...-..-': '$',
        '.--.-.': '@',
        '...---...': 'SOS'
    }

    // split into words the text by 3 spaces
    let words = morseCode.split('   ');

    return words.map(w => {
        // split into letters the words by a single space
        let letters = w.trim().split(' ');
        return letters.reduce((text, code) => {
            if (code === '') {
                return text
            } else {
                return text += MORSE[code]
            }
        }, '');
    }).join(' ').trim();
}


console.log(decodeMorse('  .   . '), 'E E');
console.log(decodeMorse('      ...---... -.-.--   - .... .   --.- ..- .. -.-. -.-   -... .-. --- .-- -.   ..-. --- -..-   .--- ..- -- .--. ...   --- ...- . .-.   - .... .   .-.. .- --.. -.--   -.. --- --. .-.-.-  '), 'SOS! THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.');
console.log(decodeMorse('... --- ...'), 'SOS');
console.log(decodeMorse('.... . -.--   .--- ..- -.. .'), 'HEY JUDE');