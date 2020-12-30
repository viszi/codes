// https://www.codewars.com/kata/5511b2f550906349a70004e1
// Define a function that takes in two non-negative integers aaa and bbb and returns the last decimal digit of aba^ba 
// lastDigit("4", "1")            // returns 4
// lastDigit("4", "2")            // returns 6
// lastDigit("9", "7")            // returns 9    
// lastDigit("10","10000000000")  // returns 0

// https://brilliant.org/wiki/finding-the-last-digit-of-a-power/
// 0 always returns 0
// 1 always returns 1
// 2 rotates between 2, 4, 8, 6....
// 3 rotates between 3, 9, 7, 1....
// 4 rotates between 4, 6....
// 5 always returns 5
// 6 always returns 6
// 7 rotates between 7, 9, 3, 1....
// 8 rotates between 8, 4, 2, 6....
// 9 rotates between 9, 1....

// In Short:
//     Digit   Period
//     0,1,5,6 1
//     2,3,7,8 4
//     4,9     2


function lastDigit(str1, str2) {

    // handle num^0 == 1 scenario
    if (str2 === '0') {
        return 1;
    }

    //based on last number find which pattern is followed
    const DIGITS = {
        "0": {
            repeat: 1,
            pattern: [0]
        },
        "1": {
            repeat: 1,
            pattern: [1]
        },
        "2": {
            repeat: 4,
            pattern: [6, 2, 4, 8]
        },
        "3": {
            repeat: 4,
            pattern: [1, 3, 9, 7]
        },
        "4": {
            repeat: 2,
            pattern: [6, 4]
        },
        "5": {
            repeat: 1,
            pattern: [5]
        },
        "6": {
            repeat: 1,
            pattern: [6]
        },
        "7": {
            repeat: 4,
            pattern: [1, 7, 9, 3]
        },
        "8": {
            repeat: 4,
            pattern: [6, 8, 4, 2]
        },
        "9": {
            repeat: 2,
            pattern: [1, 9]
        },
    }

    // get the last number of str1
    const last = str1[str1.length - 1];

    // get the value of the repetition
    const repeats = DIGITS[last].repeat;

    let remainder = 0;

    if (str2.length >= Math.floor(Math.log10(Number.MAX_SAFE_INTEGER))) {
        // remainder of large number
        // https://stackoverflow.com/questions/44948240/division-and-remainder-of-large-numbers-in-javascript
        // break the number into chunks of 10 digits (from the right) and do the modular arithmetic on the chunks, combining the result at the end
        // let chunks = [];

        // for (let i = 0; i < str2Len / 10; i++) {
        //     const val = str2.substring(str2Len - 10 * (i + 1), str2Len - 10 * i);
        //     chunks.unshift(val);
        // }

        // for (let i = 0; i < chunks.length; i++) {
        //     let element = (chunks[i] % repeats) * (Math.pow(10, chunks.length - 1 - i) % repeats);
        //     remainder += element;
        // }
        // remainder = str2.substring(str2.length-2, str2.length) % repeats;
        remainder = str2.slice(-2) % repeats;
    } else {
        remainder = str2 % repeats;
    }


    if (repeats === 1) {
        return DIGITS[last].pattern[0];
    } else {
        return DIGITS[last].pattern[remainder];
    }

}


function lastDigit_BigInt(str1, str2) {

    // handle num^0 == 1 scenario
    if (str2 === '0') {
        return 1;
    }

    //based on last number find which pattern is followed
    const DIGITS = {
        "0": {
            repeat: 1,
            pattern: [0]
        },
        "1": {
            repeat: 1,
            pattern: [1]
        },
        "2": {
            repeat: 4,
            pattern: [6, 2, 4, 8]
        },
        "3": {
            repeat: 4,
            pattern: [1, 3, 9, 7]
        },
        "4": {
            repeat: 2,
            pattern: [6, 4]
        },
        "5": {
            repeat: 1,
            pattern: [5]
        },
        "6": {
            repeat: 1,
            pattern: [6]
        },
        "7": {
            repeat: 4,
            pattern: [1, 7, 9, 3]
        },
        "8": {
            repeat: 4,
            pattern: [6, 8, 4, 2]
        },
        "9": {
            repeat: 2,
            pattern: [1, 9]
        },
    }

    // get the last number of str1
    const last = str1[str1.length - 1];

    // get the value of the repetition
    const repeats = DIGITS[last].repeat;

    let remainder = 0;

    const str2Len = str2.length;
    if (str2Len >= Math.floor(Math.log10(Number.MAX_SAFE_INTEGER))) {
        // remainder of large number using bigN
        remainder = Number(BigInt(str2) % BigInt(repeats))
    } else {
        remainder = str2 % repeats;
    }


    if (repeats === 1) {
        return DIGITS[last].pattern[0];
    } else {
        return DIGITS[last].pattern[remainder];
    }

}

console.log(lastDigit("4", "1"), 4);
console.log(lastDigit("4", "2"), 6);
console.log(lastDigit("9", "7"), 9);
console.log(lastDigit("10", "10000000000"), 0);
console.log(lastDigit("1606938044258990275541962092341162602522202993782792835301376", "2037035976334486086268445688409378161051468393665936250636140449354381299763336706183397376"), 6);
console.log(lastDigit("3715290469715693021198967285016729344580685479654510946723", "68819615221552997273737174557165657483427362207517952651"), 7);
console.log(lastDigit("03766318646176532784","57834038434149747355203985966842111916060891598981591"), 4);
console.log(lastDigit("7105036092762136118963","5976044095490349862932018997019718423885217"), 3);




