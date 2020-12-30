// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-15-lattice-paths
// Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
// a diagram of 6 2 by 2 grids showing all the routes to the bottom right corner
// How many such routes are there through a given gridSize?

// https://en.wikipedia.org/wiki/Lattice_path
// Using Pascal triangle
// 0                        1
//                       1     1
// 1                  1    *2*    1
//                 1     3     3     1
// 2            1     4    *6*    4     1 
//           1     5    10    10     5     1
// 3      1     6    15   *20*   15     6     1    
//     1     7    21    35    35     21    7     1 


function latticePaths(gridSize) {
    let pascalTriangle = [[1], [1, 1]];

    // add a new row to the traingle
    for (let i = 0; i < gridSize * 2; i++) {
        // start the new with 1
        let newRow = [1];
        let lastRow = pascalTriangle[pascalTriangle.length - 1];

        for (let j = 0; j < lastRow.length - 1; j++) {
            const newValue = lastRow[j] + lastRow[j + 1];
            newRow.push(newValue);
        }

        // end with 1
        newRow.push(1);

        // add the newly created row to the triangle
        pascalTriangle.push(newRow);
    }

    // the answer for the problem is the middle element of row gridSize * 2  
    const result = pascalTriangle[gridSize * 2];

    return result[Math.floor(result.length / 2)];
}

console.log(latticePaths(4), 70);
console.log(latticePaths(9), 48620);
console.log(latticePaths(20), 137846528820);