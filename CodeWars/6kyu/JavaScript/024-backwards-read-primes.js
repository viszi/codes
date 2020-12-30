// https://www.codewars.com/kata/5539fecef69c483c5a000015
// Backwards Read Primes are primes that when read backwards in base 10 (from right to left) are a different prime. (This rules out primes which are palindromes.)
// Examples:
// 13 17 31 37 71 73 are Backwards Read Primes
// 13 is such because it's prime and read from right to left writes 31 which is prime too. Same for the others.
// Task
// Find all Backwards Read Primes between two positive given numbers (both inclusive), the second one always being greater than or equal to the first one. The resulting array or the resulting string will be ordered following the natural order of the prime numbers.
// backwardsPrime(2, 100) => [13, 17, 31, 37, 71, 73, 79, 97] 
// backwardsPrime(9900, 10000) => [9923, 9931, 9941, 9967] 
// backwardsPrime(501, 599) => []

function backwardsPrime(start, stop) {

    let backwards = [];

    const isPrime = num => {
        if (num <= 1) return false;
        if (num < 4) return true;
        if (num % 2 === 0) return false;

        let divisor = 3
        while (divisor <= Math.sqrt(num)) {
            if (num % divisor === 0) {
                return false;
            } else {
                divisor += 2;
            }
        }
        return true;
    }

    for (let i = start > 13 ? start : 13; i <= stop; i++) {
        if (isPrime(i)) {
            // generate reversed number
            const backward = +i.toString().split('').reverse().join('');

            // palindromes must be skipped
            if (backward != i) {
                if (isPrime(backward)) {
                    backwards.push(i);
                }
            }
        }
    }

    return backwards;
}

console.log(backwardsPrime(2, 100), [13, 17, 31, 37, 71, 73, 79, 97]);
console.log(backwardsPrime(9900, 10000), [9923, 9931, 9941, 9967]);
console.log(backwardsPrime(501, 599), []);
console.log(backwardsPrime(7000, 7100), [7027, 7043, 7057]);
console.log(backwardsPrime(70000, 70245), [70001, 70009, 70061, 70079, 70121, 70141, 70163, 70241]);
console.log(backwardsPrime(1095000, 1095403), [109537, 109579, 109583, 109609, 109663]);
console.log(backwardsPrime(1000001, 1000100), [1000033, 1000037, 1000039]);
console.log(backwardsPrime(34607, 35608), [34613, 34651, 34673, 34687, 34721, 34757, 34781, 34807, 34841, 34847, 34897, 34919, 34961, 34963, 35027, 35051, 35069, 35083, 35099, 35117, 35129, 35141, 35149, 35159, 35201, 35221, 35227, 35257, 35267, 35281, 35311, 35317, 35323, 35327, 35363, 35381, 35401, 35419, 35437, 35447, 35461, 35521, 35531, 35537, 35569, 35591]);
console.log(backwardsPrime(70489, 70589), [70489, 70529, 70573, 70589]);