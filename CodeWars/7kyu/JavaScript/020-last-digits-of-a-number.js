// https://www.codewars.com/kata/5cd5ba1ce4471a00256930c0
// Your job is to write function last_digits(n,d) which return the last d digits of an integer n as a list. n will be from 0 to 10^10
// last_digits(1,1) --> [1]
// last_digits(1234,2) --> [3,4]
// last_digits(637547,6) --> [6,3,7,5,4,7]
// Special cases:
// If d > the number of digits, just return the number's digits as a list.
// If d <= 0, then return an empty list.

function solution(n, d) {

    const digits = n === 0 ? 1 : Math.floor(Math.log10(n)) + 1;
    let result = [];

    if (d <= 0) {
        return [];
    } else {
        while (result.length < d && n > 0) {
            const last_digit = n % 10;
            n = Math.floor(n / 10);
            result.unshift(last_digit);
        }
        return result;
    }

}


console.log(solution(1, 1), [1])
console.log(solution(123767, 4), [3, 7, 6, 7])
console.log(solution(0, 1), [0])
console.log(solution(34625647867585, 10), [5, 6, 4, 7, 8, 6, 7, 5, 8, 5])
console.log(solution(1234, 0), [])
console.log(solution(24134, -4), [])
console.log(solution(1343, 5), [1, 3, 4, 3])