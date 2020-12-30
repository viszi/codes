// https://www.codewars.com/kata/5ba38ba180824a86850000f7
// In this Kata, you will remove the left-most duplicates from a list of integers and return the result.
// Remove the 3's at indices 0 and 3
// followed by removing a 4 at index 1
// solve([3, 4, 4, 3, 6, 3]); // => [4, 6, 3]

function solve(arr){
    // create an array which will hold the result
    let result = [];

    // loop through the input array in reverse order and 
    // add to result any number which does not exist yet
    for (let i = arr.length; i > -1; i--) {

        let number = arr[i];

        // if we have not seen the number add to result
        if (result.indexOf(number) == -1) {
            result.push(number);
        }
    }

    // remove first empty element and reverse back the array
    return result.slice(1).reverse();
}


console.log(solve([3,4,4,3,6,3])); // === [4,6,3]);
console.log(solve([1,2,1,2,1,2,3])); // === [1,2,3]);
console.log(solve([1,2,3,4])); // === [1,2,3,4]);
console.log(solve([1,1,4,5,1,2,1])); // === [4,5,2,1]);
console.log(solve([1,2,1,2,1,1,3])); // === [2,1,3]);