// https://www.codewars.com/kata/558f0553803bc3c4720000af
// Figure out an efficient strategy to solve the problem of finding the sole duplicate number among an unsorted array/list of numbers starting from 1 up to n.

// Hints: a solution in linear time can be found; using the most intuitive ones to search for duplicates that can run in O(n²) time won't work.

var findDup=function(arr){
    let memo = {};
    
    for(i = 0; i < arr.length; i++) {
        const value = arr[i];
        if (value in memo) return value; 
        memo[value] = true;
    }    

  }


console.log(findDup([1,2,3,1]), 1);
console.log(findDup([5,4,3,2,1,1]), 1);
console.log(findDup([1,3,2,5,4,5,7,6]), 5);
console.log(findDup([8,2,6,3,7,2,5,1,4]), 2);
console.log(findDup([1,1]), 1);