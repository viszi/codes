// https://www.codewars.com/api/v1/code-challenges/534a0c100d03ad9772000539
// The prime factorization of a positive integer is a list of the integer's prime factors, together with their multiplicities; the process of determining these factors is called integer factorization. The fundamental theorem of arithmetic says that every positive integer has a single unique prime factorization.
// The prime factorization of 24, for instance, is (2^3) * (3^1).
// Write a class called PrimeFactorizer whose constructor accepts exactly 1 number (a positive integer) and has a property factor containing an object where the keys are prime numbers as strings and the values are the multiplicities.
// new PrimeFactorizer(24).factor //should return { '2': 3, '3': 1 }

class PrimeFactorizer {
    // constructor
    constructor(n) {
        this.n = n;
    }

    // The get syntax binds an object property to a function that will be called when that property is looked up
    get factor() {
        return this.factorize(this.n);
    }

    factorize(n) {
        let factors = {};

        let divisor = 2;
        while (n > 1) {
            if (n % divisor === 0) {
                factors[divisor] = (factors[divisor] || 0) + 1;
                n /= divisor;
            } else {
                divisor++;
            }
        }
        return factors;
    }
}


// console.log(PrimeFactorizer(13), { '13': 1 });
// console.log(PrimeFactorizer(24), { '2': 3, '3': 1 });
// console.log(PrimeFactorizer(574), { '2': 1, '7': 1, '41': 1 });


console.log(new PrimeFactorizer(13).factor, { '13': 1 });
console.log(new PrimeFactorizer(24).factor, { '2': 3, '3': 1 });
console.log(new PrimeFactorizer(32715956).factor, { '2': 2, '7': 1, '13': 1, '17': 2, '311': 1 });