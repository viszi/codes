// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-17-number-letter-counts
// If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
// If all the numbers from 1 to given limit inclusive were written out in words, how many letters would be used?
// Note: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.


// helper function to convert number to written out words
function numberToString(number) {

    const DICT = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen',
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
        60: 'sixty',
        70: 'seventy',
        80: 'eighty',
        90: 'ninety',
    }

    const MULTI = {
        2: 'hundred',
        3: 'thousand',
        6: 'million'
    }

    let numberToString = '';
    let value;

    while (number > 0) {

        // get millions/thousands and hundreds
        let multiplier = Math.floor(Math.log10(number));

        // handle if multiplier is 4 or 5 instead of 3
        switch (multiplier) {
            case 4:
            case 5:
                multiplier = 3;
                break;
            case 7:
            case 8:
                multiplier = 6;
                break;
        }

        if (MULTI[multiplier]) {
            value = Math.floor(number / 10 ** multiplier);

            if (value > 100) {
                numberToString += ' ' + DICT[Math.floor(value / 100)] + ' hundred';

                let remainder = value - Math.floor(value / 100) * 100;
                if (remainder > 20) {
                    if (DICT[remainder]) {
                        // (5)60 (five hundred )sixty
                        numberToString += ' ' + DICT[remainder];
                    } else {
                        // (5)67 = (five hundred )sixty-seven or 
                        numberToString += ' ' + DICT[remainder - remainder % 10] + '-' + DICT[remainder % 10];
                    }
                } else {
                    // (50)7 = (five hundred )seven
                    numberToString += ' ' + DICT[value % 10];
                }
            } else if (value > 20) {
                numberToString += ' ' + DICT[value - value % 10] + '-' + DICT[value % 10];
            } else {
                numberToString += ' ' + DICT[value];
            }

            numberToString += ' ' + MULTI[multiplier];
            number -= value * 10 ** multiplier;
        } else {
            // add 'and' to non-blank string
            if (numberToString.length > 0) {
                numberToString += ' and '
            }
        
            // get numbers below 100
            if (number > 20) {
                if (DICT[number]) {
                    numberToString += DICT[number];
                } else {
                    numberToString += DICT[number - number % 10] + '-' + DICT[number % 10];
                }             
            } else {
                numberToString += DICT[number];
            }
            number = 0;
        }
    }

    return numberToString.trim();
}

function numberLetterCounts(limit) {

    let total = '';

    for (let i = 1; i <= limit; i++) {
        total += numberToString(i);
    }

    return total.replace(/[ ,-]/g, '').length;
}

// console.log(numberToString(11));
// console.log(numberToString(55));
// console.log(numberToString(76));
// console.log(numberToString(210));
// console.log(numberToString(342));
// console.log(numberToString(2001));
// console.log(numberToString(9862));
// console.log(numberToString(276920));
// console.log(numberToString(12345678));

console.log(numberLetterCounts(5), 19);
console.log(numberLetterCounts(150), 1903);
console.log(numberLetterCounts(1000), 21124);