// https://www.codewars.com/kata/5541f58a944b85ce6d00006a
// The Fibonacci numbers are the numbers in the following integer sequence (Fn):
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
// F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.

// Given a number, say prod (for product), we search
// Some Examples of Return:
// (depend on the language)

// productFib(714) # should return (21, 34, true), 
//                 # since F(8) = 21, F(9) = 34 and 714 = 21 * 34

// productFib(800) # should return (34, 55, false), 
//                 # since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55

function productFib(prod) {
    //store Fibonacci numbers and their products in array
    let fibonacciNumbers = [0, 1];
    let fibonacciProduct = [0];

    let f0 = 0;
    let f1 = 1;
    let fibProduct = 0;

    while (fibProduct < prod) {
        //next Fibonacci number is the sum of f0 and f1
        f2 = f0 + f1;

        //this is the product of the numbers
        fibProduct = f0 * f1;

        //add to array the generated number
        fibonacciNumbers.push(f2);

        //add to array the product of the generated numbers
        fibonacciProduct.push(fibProduct)

        //reassing the numbers for the next loop
        f0 = f1;
        f1 = f2;
    }

    //return the last 3 elements from the numbers array and replace the last element with true or false
    return fibonacciNumbers.slice(-3, -1).concat(fibonacciProduct.pop() === prod);

}

console.log(productFib(4895), [55, 89, true]);
console.log(productFib(5895), [89, 144, false]);
console.log(productFib(74049690), [6765, 10946, true]);
console.log(productFib(84049690), [10946, 17711, false]);
console.log(productFib(193864606), [10946, 17711, true]);
console.log(productFib(447577), [610, 987, false]);
console.log(productFib(602070), [610, 987, true]);