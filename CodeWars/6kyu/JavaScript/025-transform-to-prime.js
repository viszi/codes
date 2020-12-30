// https://www.codewars.com/kata/5a946d9fba1bb5135100007c
// Given a List [] of n integers , find minimum number to be inserted in a list, so that sum of all elements of list should equal the closest prime number .
// - List size is at least 2 .
// - List's numbers will only positives (n > 0) .
// - Repetition of numbers in the list could occur .
// - The newer list's sum should equal the closest prime number .

function minimumNumber(numbers) {

    // get the curret array sum
    const sum = numbers.reduce((s, v) => s += v);

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

    let diff = 0;
    // loop upwards 1 by 1 until a prime is not found    
    while (!isPrime(sum + diff)) {
        diff++;
    }

    return diff;
}


console.log(minimumNumber([3, 1, 2]), 1);
console.log(minimumNumber([5, 2]), 0);
console.log(minimumNumber([1, 1, 1]), 0);
console.log(minimumNumber([2, 12, 8, 4, 6]), 5);
console.log(minimumNumber([50, 39, 49, 6, 17, 28]), 2);