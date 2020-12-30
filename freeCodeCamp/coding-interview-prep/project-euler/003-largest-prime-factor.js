// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-3-largest-prime-factor
// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the given number?

function largestPrimeFactor(number) {

    let largest = 1;
    let divisor = 2;
    let factors = {}   // place to store all prime factors of the number

    while (number > 1) {
        if (number % divisor === 0) {
            number /= divisor;
            factors[divisor] = (factors[divisor] || 0) +1;  // add to found divisors
            largest = (divisor > largest ? divisor : largest)
        } else {
            divisor += (divisor > 2 ? 2 : 1);
        }
    }
    console.log('Prime factors: ', factors);
    return largest;
}

console.log(largestPrimeFactor(13195), 29);
console.log(largestPrimeFactor(600851475143), 6857);
