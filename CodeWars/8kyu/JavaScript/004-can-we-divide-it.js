// https://www.codewars.com/kata/5a2b703dc5e2845c0900005a
// Your task is to create functionisDivideBy (or is_divide_by) to check if an integer number is divisible by each out of two arguments.
// (-12, 2, -6)  ->  true
// (-12, 2, -5)  ->  false

function isDivideBy(number, a, b) {
    return (number % a === 0 && number % b === 0)
}

console.log(isDivideBy(-12, 2, -6), true);
console.log(isDivideBy(-12, 2, -5), false);
console.log(isDivideBy(45, 1, 6), false);
console.log(isDivideBy(45, 5, 15), true);
console.log(isDivideBy(4, 1, 4), true);
console.log(isDivideBy(15, -5, 3), true);