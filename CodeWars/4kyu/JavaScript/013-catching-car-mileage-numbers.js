// https://www.codewars.com/kata/52c4dd683bfd3b434c000292/
// It's up to you, intrepid warrior, to glue the parts together. Write the function that parses the mileage number input, and returns a 2 if the number is "interesting" (see below), a 1 if an interesting number occurs within the next two miles, or a 0 if the number is not interesting.
// "Interesting" Numbers
// Interesting numbers are 3-or-more digit numbers that meet one or more of the following criteria:
// - Any digit followed by all zeros: 100, 90000
// - Every digit is the same number: 1111
// - The digits are sequential, incementing†: 1234
// - The digits are sequential, decrementing‡: 4321
// - The digits are a palindrome: 1221 or 73837
// - The digits match one of the values in the awesomePhrases array
// † For incrementing sequences, 0 should come after 9, and not before 1, as in 7890.
// ‡ For decrementing sequences, 0 should come after 1, and not before 9, as in 3210.

function isInteresting(number, awesomePhrases) {

    // numbers below 99 are boring
    if (number <= 99) {
        return 0;
    }

    const numString0 = String(number);
    const numString1 = String(number + 1);
    const numString2 = String(number + 2);

    //1 - any digit follow by all zeros
    // remove first letter and check if everything is zero with coertion
    if (+numString0.slice(1) === 0) {
        return 2;
    }

    if (+numString1.slice(1) === 0 || +numString2.slice(1) === 0) {
        return 1;
    }

    //2 - every digit is the same
    if (new Set(numString0.split('')).size === 1) {
        return 2;
    }

    if (new Set(numString1.split('')).size === 1 || new Set(numString2.split('')).size === 1) {
        return 1;
    }

    //3 - digits are sequential, incrementing 7890
    let prev = numString0[0];
    let sequential = true;
    for (let i = 1; i < numString0.length; i++) {
        const actual = numString0[i];
        if (actual - prev !== 1) {
            sequential = false;
            break;
        }
        prev = actual;
    }

    if (sequential) {
        return 2;
    }

    prev = numString1[0];
    for (let i = 1; i < numString1.length; i++) {
        const actual = numString1[i];
        if (actual - prev !== 1) {
            sequential = false;
            break;
        }
        prev = actual;
    }

    if (sequential) {
        return 1;
    }

    prev = numString2[0];
    for (let i = 1; i < numString2.length; i++) {
        const actual = numString2[i];
        if (actual - prev !== 1) {
            sequential = false;
            break;
        }
        prev = actual;
    }

    if (sequential) {
        return 1;
    }


    //4 - digits are sequantial, decrementing 3210
    prev = numString0[0];
    sequential = true;
    for (let i = 1; i < numString0.length; i++) {
        const actual = numString0[i];
        if (prev - actual !== 1) {
            sequential = false;
            break;
        }
        prev = actual;
    }

    if (sequential) {
        return 2;
    }

    prev = numString1[0];
    for (let i = 1; i < numString1.length; i++) {
        const actual = numString1[i];
        if (prev - actual !== 1) {
            sequential = false;
            break;
        }
        prev = actual;
    }

    if (sequential) {
        return 1;
    }

    prev = numString2[0];
    for (let i = 1; i < numString2.length; i++) {
        const actual = numString2[i];
        if (prev - actual !== 1) {
            sequential = false;
            break;
        }
        prev = actual;
    }

    if (sequential) {
        return 1;
    }


    //5 - digits are palindrome
    if (numString0 === numString0.split('').reverse().join('')) {
        return 2;
    }

    if (numString1 === numString1.split('').reverse().join('') || numString2 === numString2.split('').reverse().join('')) {
        return 1;
    }

    //6 - digits matches with a phrase
    if (awesomePhrases.includes(number)) {
        return 2;
    }

    if (awesomePhrases.includes(number + 1) || awesomePhrases.includes(number + 2)) {
        return 1;
    }


    return 0;
}

function isInteresting(number, awesomePhrases) {

    // numbers below 99 are boring
    if (number <= 97) {
        return 0;
    }

    const numString0 = String(number);
    const numString1 = String(number + 1);
    const numString2 = String(number + 2);

    const firstCheck = (input) => input >= 100 ? +input.slice(1) === 0 : false;
    const secondCheck = (input) => input >= 100 ? new Set(input.split('')).size === 1 : false;
    const thirdCheck = (input, value) => {
        
        if (input < 100) {
            return false;
        }
        
        let previous = +input[0];
        let sequential = true;
        for (let i = 1; i < input.length; i++) {
            let actual = +input[i];

            if (value === 1 && actual === 0) {
                actual = 10;
            }

            if (actual - previous !== value) {
                sequential = false;
                break;
            }
            previous = actual;
        }

        return sequential;
    };
    const fourthCheck = (input) => input >= 100 ? input === input.split('').reverse().join('') : false;
    const fifthCheck = (input) => input >= 100 ? awesomePhrases.includes(input) : false;

    // check highest priorities
    if (firstCheck(numString0)) return 2;
    if (secondCheck(numString0)) return 2;
    if (thirdCheck(numString0, 1)) return 2;
    if (thirdCheck(numString0, -1)) return 2;
    if (fourthCheck(numString0)) return 2;
    if (fifthCheck(+numString0)) return 2;
      
    // check other rules
    if (firstCheck(numString1)) return 1;
    if (firstCheck(numString2)) return 1;
    
    if (secondCheck(numString1)) return 1;
    if (secondCheck(numString2)) return 1;

    if (thirdCheck(numString1, 1)) return 1;
    if (thirdCheck(numString2, 1)) return 1;
    
    if (thirdCheck(numString1, -1)) return 1;
    if (thirdCheck(numString2, -1)) return 1;

    if (fourthCheck(numString1)) return 1;
    if (fourthCheck(numString2)) return 1;
    
    if (fifthCheck(+numString1)) return 1;
    if (fifthCheck(+numString2)) return 1;

    return 0;
}

console.log(isInteresting(99, []), 1);
console.log(isInteresting(7890, [1337, 256]), 2);
console.log(isInteresting(3209, [1337, 256]), 1);
console.log(isInteresting(3207, [1337, 256]), 0);
console.log(isInteresting(900, [1337, 256]), 2);
console.log(isInteresting(3, [1337, 256]), 0);
console.log(isInteresting(1336, [1337, 256]), 1);
console.log(isInteresting(1337, [1337, 256]), 2);
console.log(isInteresting(11208, [1337, 256]), 0);
console.log(isInteresting(11209, [1337, 256]), 1);
console.log(isInteresting(11211, [1337, 256]), 2);