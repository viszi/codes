// https://www.codewars.com/kata/52597aa56021e91c93000cb0
// Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.
// moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]

function moveZeros (arr) {
    //store result in another array
    let result = [];

    //count number of zeros 
    let zeroElements = 0;

    //loop through each element of the array and if it is not zero add to the result
    arr.forEach(element => {
        if (element !== 0) {
            result.push(element);
        } else {
            zeroElements++;
        }   
    });

    //add zeros to the result array
    for (let i = 0; i < zeroElements; i++) {
        result.push(0);
    }

    return result
}


function moveZeros(arr) {
   
    //use filter to remove zeros
    let result = arr.filter(element => element !== 0);

    //count zero elements
    let zeroElements = arr.length - result.length;

    //create an array with zero values
    let zeroArray = Array.from({length: zeroElements}).fill(0);

    return result.concat(zeroArray)
}

console.log(moveZeros([1, 2, 0, 1, 0, 1, 0, 3, 0, 1]), [1, 2, 1, 1, 3, 1, 0, 0, 0, 0]);