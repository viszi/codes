// https://www.codewars.com/kata/529bf0e9bdf7657179000008
// Write a function validSolution/ValidateSolution/valid_solution() that accepts a 2D array representing a Sudoku board, and returns true if it is a valid solution, or false.
// The board is always 9 cells by 9 cells, and every cell only contains integers from 0 to 9.

function validSolution(arr) {
    //helper to check sum of the given array
    const sum = (data) => data.reduce((s, v) => s += v);

    //check if sum of each row is 1 + 2 + 3 ... = 45
    if (!arr.every(row => sum(row) === 45)) {
        return false;
    }

    let matrix = [];
    //transpose the array
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            row.push(arr[j][i]);
        }
        matrix.push(row);
    }

    //check if sum of each column is 45
    if (!matrix.every(row => sum(row) === 45)) {
        return false;
    }

    matrix = [];
    //create the subgrids
    for (let g = 0; g < 9; g++) {
        let grid = [];
        let rowOffset = Math.floor(g / 3);
        let columnOffset = g % 3
        
        grid.push(arr[3 * rowOffset][3 * columnOffset]);
        grid.push(arr[3 * rowOffset][3 * columnOffset + 1])
        grid.push(arr[3 * rowOffset][3 * columnOffset + 2])
        grid.push(arr[3 * rowOffset + 1][3 * columnOffset])
        grid.push(arr[3 * rowOffset + 1][3 * columnOffset + 1])
        grid.push(arr[3 * rowOffset + 1][3 * columnOffset + 2])
        grid.push(arr[3 * rowOffset + 2][3 * columnOffset])
        grid.push(arr[3 * rowOffset + 2][3 * columnOffset + 1])
        grid.push(arr[3 * rowOffset + 2][3 * columnOffset + 2])

        matrix.push(grid);
    }

    //check if sum of each column is 45
    if (!matrix.every(row => sum(row) === 45)) {
        return false;
    }

    return true;
}

console.log(validSolution([
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
])); // => true

console.log(validSolution([
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 0, 3, 4, 8],
    [1, 0, 0, 3, 4, 2, 5, 6, 0],
    [8, 5, 9, 7, 6, 1, 0, 2, 0],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 0, 1, 5, 3, 7, 2, 1, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 0, 0, 4, 8, 1, 1, 7, 9]
])); // => false