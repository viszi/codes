// https://www.codewars.com/kata/558fc85d8fd1938afb000014
// Create a function that returns the sum of the two lowest positive numbers given an array of minimum 4 positive integers. 
// No floats or non-positive integers will be passed.
// For example, when an array is passed like [19, 5, 42, 2, 77], the output should be 7.


function sumTwoSmallestNumbers(numbers) {
    // find the 2 lowest value in the array
    // assume the first 2 numbers in the array the lowest
    // value1 will be smaller then value2

    let value1;
    let value2;

    if (numbers[0] < numbers[1]) {
        value1 = numbers[0];
        value2 = numbers[1];
    } else {
        value1 = numbers[1];
        value2 = numbers[0];
    }

    // loop through the remaining items in the array
    for (let i = 2; i < numbers.length; i++) {
        // when new number is smaller then the bigger smallest then we should add either to value1 or value2
        if (numbers[i] < value2) {
            if (numbers[i] < value1) {
                value2 = value1;
                value1 = numbers[i];
            } else {
                value2 = numbers[i];
            }
        }
    }
    return value1 + value2;
}

function sumTwoSmallestNumbers(numbers) {
    // sort array
    numbers.sort(function (num1, num2) { return num1 - num2 });

    return numbers[0] + numbers[1];
}


console.log(sumTwoSmallestNumbers([5, 8, 12, 19, 22]) == 13);
console.log(sumTwoSmallestNumbers([15, 28, 4, 2, 43]) == 6);
console.log(sumTwoSmallestNumbers([3, 87, 45, 12, 7]) == 10);
console.log(sumTwoSmallestNumbers([23, 71, 33, 82, 1]) == 24);
console.log(sumTwoSmallestNumbers([52, 76, 14, 12, 4]) == 16);