// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-27-quadratic-primes
// Euler discovered the remarkable quadratic formula:
// n^2+n+41 
// It turns out that the formula will produce 40 primes for the consecutive integer values  0≤n≤39 . However, when  n=40,402+40+41=40(40+1)+41  is divisible by 41, and certainly when  n=41,412+41+41  is clearly divisible by 41.
// The incredible formula  n^2−79n+1601  was discovered, which produces 80 primes for the consecutive values  0≤n≤79 . The product of the coefficients, −79 and 1601, is −126479.

// Considering quadratics of the form:
// - n^2+an+b , where  |a|<range  and  |b|≤range 
// - where  |n|  is the modulus/absolute value of  n 
// - e.g.  |11|=11  and  |−4|=4 
// Find the product of the coefficients,  a  and  b , for the quadratic expression that produces the maximum number of primes for consecutive values of  n , starting with  n=0 .

function quadraticPrimes(range) {

    const formula = (n, a, b) => n * n + a * n + b;

    const isPrime = number => {
        if (number < 2) return false;
        if (number > 2 && number % 2 === 0) return false;

        for (let div = 3, limit = Math.sqrt(number); div <= limit; div++) {
            if (number % div === 0) return false;
        }
        return true;
    };

    let maxGeneratedPrimes = 0;
    let coefficients = 0;

    for (let b = -range; b <= range; b++) {
        for (let a = 1 - range; a < range; a++) {
            let n = 0;
            let generatedPrimes = 0;
            let number = formula(n, a, b);

            while (isPrime(number)) {
                generatedPrimes++;
                n++;
                number = formula(n, a, b);
            }
            if (generatedPrimes >= maxGeneratedPrimes) {
                maxGeneratedPrimes = generatedPrimes;
                coefficients = a * b;
            }
        }
    }
    return coefficients;
}

console.log(quadraticPrimes(41), -41);
console.log(quadraticPrimes(200), -4925);
console.log(quadraticPrimes(500), -18901);
console.log(quadraticPrimes(800), -43835);
console.log(quadraticPrimes(1000), -59231);