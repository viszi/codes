// https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1
// Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.
// array = [[1,2,3],
//          [4,5,6],
//          [7,8,9]]
// snail(array) #=> [1,2,3,6,9,8,7,4,5]

function snail(array) {
    //remove the values from the array
    let step = 0;   //step mod 4 gives the direction
    let result = [];

    while (array.length > 0) {
        let temp;
        switch (step % 4) {
            case 0:
                //move each element of the first row into the result array from left to right
                temp = array.splice(0, 1);
                for (let i = 0; i < temp[0].length; i++) {
                    result.push(temp[0][i]);
                }
                step += 1;
                break;
            case 1:
                //move the last elements of each row to result from top to bottom
                for (let i = 0; i < array.length; i++) {
                    temp = array[i].pop();
                    result.push(temp);
                }
                step += 1;
                break;
            case 2:
                //move each element of the last row to into the result array from right to left 
                temp = array.pop();
                for (let i = temp.length - 1; i >= 0; i--) {
                    result.push(temp[i]);
                }
                step += 1;
                break;
            case 3:
                //move the first element of each row to result from bottom to top
                for (let i = array.length - 1; i >= 0; i--) {
                    temp = array[i].splice(0, 1);
                    result.push(temp[0]);
                }
                step += 1;
                break;
        }

    }

    return result;
}


console.log(snail([[1, 2, 3], [8, 9, 4], [7, 6, 5]]));
console.log(snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); //[1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(snail([[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]])); //, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(snail([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]])); //, [1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]);
console.log(snail([[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]])); //, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);