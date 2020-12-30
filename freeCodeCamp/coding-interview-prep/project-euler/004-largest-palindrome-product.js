// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-4-largest-palindrome-product
// A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
// Find the largest palindrome made from the product of two n-digit numbers.


function largestPalindromeProduct(n) {

    if (n < 2) return 0;

    // generate the largest number with n-digit
    const maxNumber = (10 ** n) - 1;

    // place to store the largest palindrome
    let largest = 0;

    const isPalindrome = (number) => {
        return number.toString() === number.toString().split('').reverse().join('');
    };

    // calculate combinations of the largest
    // multiplication is commutative (a*b = b*a) so it is enough to check only half way of 1 iteration
    for (let i = maxNumber; i >= maxNumber / 2; i--) {
        for (let j = maxNumber; j >= 0; j--) {
            const number = i * j;

            if (isPalindrome(number)) {
                if (number > largest) {
                    largest = number;
                    break;
                }
            }
        }
    }

    return largest;
}

console.log(largestPalindromeProduct(2), 9009);
console.log(largestPalindromeProduct(3), 906609);