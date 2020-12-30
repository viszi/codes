// https://www.codewars.com/kata/54eb33e5bc1a25440d000891
// Given a positive integral number n, return a strictly increasing sequence (list/array/string depending on the language) of numbers, so that the sum of the squares is equal to n².
// If there are multiple solutions (and there will be), return as far as possible the result with the largest possible values:
// decompose(11) must return [1,2,4,10]. Note that there are actually two ways to decompose 11², 11² = 121 = 1 + 4 + 16 + 100 = 1² + 2² + 4² + 10² but don't return [2,6,9], since 9 is smaller than 10.
// For decompose(50) don't return [1, 1, 4, 9, 49] but [1, 3, 5, 8, 49] since [1, 1, 4, 9, 49] doesn't form a strictly increasing sequence.


function decompose(num) {
    // store the result
    let result = [];

    let remainder = num ** 2;

    while (remainder != 0) {
        // find always the biggest square of the remainder
        let x = Math.floor(Math.sqrt(remainder));

        // if we don't have anything in the result we need the next smaller interger
        if (result.length === 0) {
            x -= 1;
        }

        // if value is smaller or equal 1, but we have nothing in the result we should return null 
        if (x <= 1 & result.length === 0) return null;

        // if calculated number is already in the array we have to restart the decomposition
        if (result.includes(x)) {
            let biggest = result.pop();
            let secondBiggest = result.pop();

            // if  the second biggest is 1 then we will not get a valid result
            // start the composition from a smaller biggest number
            if (secondBiggest === 1) {
                result = [biggest - 1];
                remainder = num ** 2 - (biggest - 1) ** 2;
            } else {
                // start the composition with the biggest and a smaller secondBiggest
                result = [secondBiggest - 1, biggest];
                remainder = num ** 2 - biggest ** 2 - (secondBiggest - 1) ** 2;
            }
        } else {
            result.splice(0, 0, x);
            remainder -= x ** 2;
        }
    }

    return result.sort((a, b) => (a - b));
}

console.log(decompose(1), null);
console.log(decompose(11), [1, 2, 4, 10]);
console.log(decompose(7), [2, 3, 6]);
console.log(decompose(50), [1, 3, 5, 8, 49]);
console.log(decompose(12), [1, 2, 3, 7, 9]);
console.log(decompose(44), [2, 3, 5, 7, 43]);