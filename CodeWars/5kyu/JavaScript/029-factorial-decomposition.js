// https://www.codewars.com/kata/5a045fee46d843effa000070
// The aim of the kata is to decompose n! (factorial n) into its prime factors.

// Examples:

// n = 12; decomp(12) -> "2^10 * 3^5 * 5^2 * 7 * 11"
// since 12! is divisible by 2 ten times, by 3 five times, by 5 two times and by 7 and 11 only once.

// n = 22; decomp(22) -> "2^19 * 3^9 * 5^4 * 7^3 * 11^2 * 13 * 17 * 19"

// n = 25; decomp(25) -> 2^22 * 3^10 * 5^6 * 7^3 * 11^2 * 13 * 17 * 19 * 23
// Prime numbers should be in increasing order. When the exponent of a prime is 1 don't put the exponent.

// Notes
// the function is decomp(n) and should return the decomposition of n! into its prime factors in increasing order of the primes, as a string.
// factorial can be a very big number (4000! has 12674 digits, n can go from 300 to 4000).
// In Fortran - as in any other language - the returned string is not permitted to contain any redundant trailing whitespace: you can use dynamically allocated character strings.

function decomp(n) {
    let factorials = {};

    const genFactorials = x => {
        let divisor = 2;
        while (x > 1) {
            if (x % divisor === 0) {
                factorials[divisor] = (factorials[divisor] || 0) + 1
                x /= divisor;
            } else {
                if (divisor > 2) {
                    divisor += 2;
                } else {
                    divisor += 1;
                }
            }
        }
    }

    for (let i = 2; i <= n; i++) {
        genFactorials(i);
    }

    let result = '';
    for (factorial in factorials) {
        if (factorials[factorial] > 1) {
            result += `${factorial}^${factorials[factorial]} * `;
        } else {
            result += `${factorial} * `;
        }
    }

    return result.substring(0, result.length - 3);
}

console.log(decomp(5), "=> 2^3 * 3 * 5");
console.log(decomp(17), "=> 2^15 * 3^6 * 5^3 * 7^2 * 11 * 13 * 17");
console.log(decomp(22), "=> 2^19 * 3^9 * 5^4 * 7^3 * 11^2 * 13 * 17 * 19");
console.log(decomp(14), "=> 2^11 * 3^5 * 5^2 * 7^2 * 11 * 13");
console.log(decomp(25), "=> 2^22 * 3^10 * 5^6 * 7^3 * 11^2 * 13 * 17 * 19 * 23");