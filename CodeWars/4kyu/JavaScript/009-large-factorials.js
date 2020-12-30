// https://www.codewars.com/kata/557f6437bf8dcdd135000010
// In mathematics, the factorial of integer n is written as n!. It is equal to the product of n and every integer preceding it. For example: 5! = 1 x 2 x 3 x 4 x 5 = 120
// Your mission is simple: write a function that takes an integer n and returns the value of n!.
// You are guaranteed an integer argument. For any values outside the non-negative range, return null, nil or None (return an empty string "" in C and C++). For non-negative numbers a full length number is expected for example, return 25! = "15511210043330985984000000" as a string.
// - The use of BigInteger or BigNumber functions has been disabled, this requires a complex solution

function factorial(n) {

    let result = '1';
    
    for (let m = 2; m <= n; m++) {
        let interim = '';
        let carryover = 0;
        
        for (let i = result.length - 1; i >= 0; i--) {
            const multi = +result[i] * m + carryover;
            interim = multi % 10 + interim;
            carryover = Math.floor(multi / 10);
        }

        if (carryover > 0) {
            result = carryover + interim;
        } else {
            result = interim;
        }
    }

    return result;

}

// console.log(factorial(1), '1');
console.log(factorial(5), '120');
console.log(factorial(9), '362880');
console.log(factorial(15), '1307674368000');