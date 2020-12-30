//https://www.codewars.com/kata/5592fc599a7f40adac0000a8
//Create a function that receives a (square) matrix and calculates the sum of both diagonals (main and secondary)

function sum(matrix) {
   //store size of the matrix
   let size = matrix.length;

   //create variable to store result
   let result = 0;
   
   //iterate through the rows
        //from first row we need first and last element
        //from middle row we need element (middle) and (size-1-actual row)
        //from last row we need first and last element
   //in general we need from any row element: (row) and (size-1-actual row)
   for (let i = 0; i < size; i++) {
        let row = matrix[i];

        //add to result elements which is in column (row) and (size-1-actual row)
        result = result + row[i] + row[size-1-i];
   }
   
    return result;
  }


  console.log(sum([[1,2,3], [4,5,6], [7,8,9]])); // , 1 + 5 + 9 + 3 + 5 + 7);