// https://www.codewars.com/kata/54d512e62a5e54c96200019e
// Given a positive number n > 1 find the prime factor decomposition of n. The result will be a string with the following form :
//  "(p1**n1)(p2**n2)...(pk**nk)"   where a ** b means a to the power of b with the p(i) in increasing order and n(i) empty if n(i) is 1.
// Example: n = 86240 should return "(2**5)(5)(7**2)(11)"

function primeFactors(n) {
    //store founded primes in an object with occurences
    let foundPrimes = {};

    let prime = 2;

    //start to divide the input number from 2 till sqrt(n)
    while (n !== 1) {
        let recheck = true;

        while (recheck) {
            //check if number can be diveded by the current prime number
            if (n % prime === 0) {
                foundPrimes[prime] = (foundPrimes[prime] || 0) + 1
                n = n / prime;
            } else {
                //step to next odd number
                prime += (prime < 3) ? 1 : 2;

                recheck = false;
            }
        }
    }

    //merge the object into a string
    let result = '';

    for (let [p, c] of Object.entries(foundPrimes)) {
       result += c > 1 ? `(${p}**${c})` : `(${p})`;
    }

    return result;
}

console.log(primeFactors(86240), "(2**5)(5)(7**2)(11)");
console.log(primeFactors(7775460), "(2**2)(3**3)(5)(7)(11**2)(17)");