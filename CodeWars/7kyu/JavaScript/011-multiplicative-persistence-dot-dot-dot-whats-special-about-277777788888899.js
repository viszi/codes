// https://www.codewars.com/kata/5c942f40bc4575001a3ea7ec
// Multiply all the digits of a nonnegative integer n by each other, repeating with the product until a single digit is obtained. 
// The number of steps required is known as the multiplicative persistence.
// Create a function that calculates the individual results of each step, not including the original number, but including the single digit, 
// and outputs the result as a list/array. If the input is a single digit, return an empty list/array.

function per(n) {

    // convert the number to string to know the length and split up by single characters
    let nstring = n.toString();

    // if length is 1 then we are done, there is no multiplicative persistence
    if (nstring.length == 1) return [];

    // store results in array
    let result = [];

    while (nstring.length > 1) {
        // this variable will store the product of the numbers
        let product = 1; 

        // loop through the number as an array and multiple each number with each other
        nstring.split("").forEach((element, index) => {
            product *= +element;
        });
        
        // add the number to the result array
        result.push(product);

        // replace the original number with the new calculated one
        nstring = product.toString();
    }

    return result;
  }


  console.log(per(1)); //, [])
  console.log(per(10)); //, [0])
  console.log(per(69)); //, [54, 20, 0])
  console.log(per(277777788888899)); //, [4996238671872, 438939648, 4478976, 338688, 27648, 2688, 768, 336, 54, 20, 0])