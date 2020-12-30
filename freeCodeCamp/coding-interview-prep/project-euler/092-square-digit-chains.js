// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-92-square-digit-chains
// A number chain is created by continuously adding the square of the digits in a number to form a new number until it has been seen before.
// For example,
// 44 → 32 → 13 → 10 → 1 → 1
// 85 → 89 → 145 → 42 → 20 → 4 → 16 → 37 → 58 → 89
// Therefore any chain that arrives at 1 or 89 will become stuck in an endless loop. What is most amazing is that EVERY starting number will eventually arrive at 1 or 89.
// How many starting numbers below ten million will arrive at 89?

// brute force
function squareDigitChains(n) {

    const formula = number => {
        return number.toString().split('').reduce((s, v) => s += (+v) * (+v), 0);
    }

    const getEndingNumber = number => {
        let sequence = [number];
        number = formula(number);

        if (cache[number]) {
            return cache[number]
        } else {
            while (cache[number] === undefined) {
                sequence.push(number);
                number = formula(number);
            }
        }

        let result = cache[number];
        // add to chache the found numbers
        for (let num of sequence) {
            cache[num] = result;
        }

        return result;
    }

    // store what is the ending of any checked number
    let cache = { 1: 1, 89: 89 };
    let count89 = 0;

    let i = 1;
    while (i <= n) {
        if (getEndingNumber(i) === 89) count89++;
        i++;
    }

    return count89;
}

console.log(squareDigitChains(10000000), 8581146);

// brute force 3000 ms 
