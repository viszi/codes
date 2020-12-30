// https://www.codewars.com/kata/5effa412233ac3002a9e471d
// For this Kata you will have to forget how to add two numbers together.

function add(num1, num2) {
    // get last char and sum it
    let num1Array = num1.toString().split("");
    let num2Array = num2.toString().split("");

    // get iteration
    const iteration = num1Array.length > num2Array.length ? num1Array.length : num2Array.length

    // store result as string
    let result = "";

    // loop through array and get from array the last element
    for (let i = 0; i < iteration; i++) {
        let value1 = num1Array.pop() || "0";
        let value2 = num2Array.pop() || "0";
        result = (+value1 + +value2).toString() + result;
    }

    // convert the string back to value
    return result * 1;
}

console.log(add(16, 18) == 214);
console.log(add(26, 39) == 515);
console.log(add(122, 81) == 1103);
