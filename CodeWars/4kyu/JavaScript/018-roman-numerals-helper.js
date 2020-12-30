// https://www.codewars.com/kata/51b66044bce5799a7f000003
// Create a RomanNumerals class that can convert a roman numeral to and from an integer value. It should follow the API demonstrated in the examples below. Multiple roman numeral values will be tested for each helper method.
// Modern Roman numerals are written by expressing each digit separately starting with the left most digit and skipping any digit with a value of zero. In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in descending order: MDCLXVI.
// RomanNumerals.toRoman(1000); // should return 'M'
// RomanNumerals.fromRoman('M'); // should return 1000
// | Symbol | Value | |----------------| | I | 1 | | V | 5 | | X | 10 | | L | 50 | | C | 100 | | D | 500 | | M | 1000 |

class RomanNumerals {
    constructor() { }

    // static method because it doesn’t depend on any instance of the class
    static toRoman(input) {
        let symbols = {
            1000: 'M',
            900: 'CM',
            //800: 'DCCC',
            //700: 'DCC',
            //600: 'DC',
            500: 'D',
            400: 'CD',
            //300: 'CCC',
            //200: 'CC',
            100: 'C',
            90: 'XC',
            //80: 'LXXX',
            //70: 'LXX',
            //60: 'LX',
            50: 'L',
            40: 'XL',
            //30: 'XXX',
            //20: 'XX',
            10: 'X',
            9: 'IX',
            //8: 'VIII',
            //7: 'VII',
            //6: 'VI',
            5: 'V',
            4: 'IV',
            //3: 'III',
            //2: 'II',
            1: 'I'
        }

        if (input > 3999 || input < 1) return null;

        let roman = '';
        let remainder = input;

        const keys = Object.keys(symbols);
        let position = 1;

        while (remainder > 0) {
            // get the next key
            let key = keys[keys.length - position];

            // check how many times the number contains the key
            let val = Math.floor(remainder / key)

            if (val > 0) {
                roman += symbols[key].repeat(val);
                remainder -= val * key;
            }
            position++;
        }

        return roman;
    }

    static fromRoman(input) {
        let symbols = {
            'M': 1000,
            //'CM': 900,
            //'DCCC': 800,
            //'DCC': 700,
            //'DC': 600,
            'D': 500,
            //'CD': 400,
            //'CCC': 300,
            //'CC': 200,
            'C': 100,
            //'XC': 90,
            //'LXXX': 80,
            //'LXX':70,
            //'LX': 60,
            'L': 50,
            //'XL': 40,
            //'XXX': 30,
            //'XX': 20,
            'X': 10,
            //'IX': 9,
            //'VIII': 8,
            //'VII': 7,
            //'VI': 6,
            'V': 5,
            //'IV': 4,
            //'III': 3,
            //'II': 2,
            'I': 1
        }

        let decimal = 0;

        for (let i = 0; i < input.length; i++) {
            // get the next symbol from the string
            let symbol = input[i];
            // convert the symbol to value
            let value = symbols[symbol];

            // check the next symbol - except if we are in last
            if (i < input.length - 1) {
                let nextSymbol = input[i + 1];
                let nextValue = symbols[nextSymbol];

                if (value < nextValue) {
                    // if the next value is bigger then previous
                    // we have to deduct the smaller from the bigger
                    decimal += nextValue - value;

                    // we have to skip the extra symbol
                    i += 1;
                } else {
                    decimal += value;
                }
            } else {
                decimal += value;
            }

        }
        return decimal;
    }

}


let data = RomanNumerals.toRoman(1000);
console.log(data, 'M');
data = RomanNumerals.toRoman(1666);
console.log(data, 'MDCLXVI');
data = RomanNumerals.toRoman(1990);
console.log(data, 'MCMXC');
data = RomanNumerals.toRoman(2020);
console.log(data, 'MMXX');
data = RomanNumerals.toRoman(2896);
console.log(data, 'MMDCCCXCVI');

data = RomanNumerals.fromRoman('M');
console.log(data, 1000);
data = RomanNumerals.fromRoman('MDCLXVI');
console.log(data, 1666);
data = RomanNumerals.fromRoman('MCMXC');
console.log(data, 1990);
data = RomanNumerals.fromRoman('MMXX');
console.log(data, 2020);
data = RomanNumerals.fromRoman('MMDCCCXCIX');
console.log(data, 2899);