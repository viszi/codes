// https://www.codewars.com/kata/5ecc1d68c6029000017d8aaf
// In this kata, your task is to find the maximum sum of any straight "beam" on a hexagonal grid, where its cell values are determined by a finite integer sequence seq.
// In this context, a beam is a linear sequence of cells in any of the 3 pairs of opposing sides of a hexagon. We'll refer to the sum of a beam's integer values as the "beam value".
// Refer to the example below for further clarification.
// Your function will receive two arguments:
//  - n : the length of each side of the hexagonal grid, where 2 <= n < 100
//  - seq : a finite sequence of (positive and/or nonpositive) integers with a length >= 1
// The sequence is used to populate the cells of the grid and should be repeated as necessary.
// The sequence type will be dependent on the language (e.g. array for JavaScript, tuple for Python, etc.).

function createHexagon(n, seq) {
    let hexagon = [];

    let position = 0;
    let rows = 2 * n - 1;
    let rowWidth = n;

    for (let i = 0; i < rows; i++) {
        let row = [];

        for (let j = 0; j < rowWidth; j++) {
            row.push(seq[position % seq.length]);
            position++;
        }

        hexagon.push(row);

        if (i < n - 1) {
            rowWidth++;
        } else {
            rowWidth--;
        }
    }

    return hexagon;
}

function maxHexagonBeam(n, seq) {

    let hexagon = createHexagon(n, seq);

    // sum rows
    const rowSums = hexagon.map(row => row.reduce((s, v) => s + v), 0);

    // diagonals
    let diagonals = [];

    // forward diagonals up-to & including main diagonal
    width = n;
    for (let i = 0; i < n; i++) {
        let column = i;
        let diagonal = [];

        for (let j = 0; j < width; j++) {
            let row = j;

            // when row reached the middle line we have to select cell from an earlier column
            if (row >= n) {
                column = width - row - 1;
            }
            diagonal.push(hexagon[row][column]);
        }
        diagonals.push(diagonal);
        width++;
    }

    // rest of the forward diagonals from right to main diagonal
    width = n;
    for (let i = 0; i < n - 1; i++) {
        let diagonal = [];

        for (let j = 0; j < width; j++) {
            // count from the last row back
            let row = 2 * n - 2 - j;
            // count from the last elements back
            let column = hexagon[row].length - 1 - i;

            // when row above the middle line we have to select cell from a later column
            if (row < n - 1) {
                column = hexagon[row].length - (width - j);
            }
            diagonal.push(hexagon[row][column]);
        }
        diagonals.push(diagonal);
        width++;
    }

    // backward diagonals from top-right to left middle diagonal
    width = n;
    for (let i = 0; i < n; i++) {
        let diagonal = [];

        for (let j = 0; j < width; j++) {
            let row = j;
            // get the correct element from the end of the row
            let column = hexagon[row].length - 1 - i;

            if (row >= n) {
                column = hexagon[row].length - (width - j);
            }
            diagonal.push(hexagon[row][column]);
        }
        diagonals.push(diagonal);
        width++;
    }

    // rest of the backward from left-bottom till middle diagonal
    width = n;
    for (let i = 0; i < n - 1; i++) {
        let diagonal = [];
        let column = i;

        for (let j = 0; j < width; j++) {
            let row = 2 * n - 2 - j;

            if (row < n - 1) {
                column = width - j - 1;
            }
            diagonal.push(hexagon[row][column]);
        }
        diagonals.push(diagonal);
        width++;
    }

    const diagonalSums = diagonals.map(row => row.reduce((s, v) => s + v), 0);

    return Math.max(...rowSums, ...diagonalSums)
}

// using padding
// right padding will move diagonals into columns
// [ 2, 4, 6, 8, 0, 0, 0 ]
// [ 2, 4, 6, 8, 2, 0, 0 ]
// [ 4, 6, 8, 2, 4, 6, 0 ]
// [ 8, 2, 4, 6, 8, 2, 4 ]
// [ 0, 6, 8, 2, 4, 6, 8 ]
// [ 0, 0, 2, 4, 6, 8, 2 ]
// [ 0, 0, 0, 4, 6, 8, 2 ]
// left padding will do the other diagonals
// [ 0, 0, 0, 2, 4, 6, 8 ]
// [ 0, 0, 2, 4, 6, 8, 2 ]
// [ 0, 4, 6, 8, 2, 4, 6 ]
// [ 8, 2, 4, 6, 8, 2, 4 ]
// [ 6, 8, 2, 4, 6, 8, 0 ]
// [ 2, 4, 6, 8, 2, 0, 0 ]
// [ 4, 6, 8, 2, 0, 0, 0 ]

function maxHexagonBeam(n, seq) {

    let hexagon = createHexagon(n, seq);
    const size = 2 * n - 1;

    // padding to the right
    let hexagonFilledRight = [];
    let hexagonFilledLeft = [];
    hexagon.forEach((row, i) => {
        const zeros = Array(size - row.length).fill(0);
        const newRight = row.concat(zeros);
        const newLeft = zeros.concat(row);
        
        if (i < n) {
            hexagonFilledRight.push(newRight);
            hexagonFilledLeft.push(newLeft);
        } else {
            hexagonFilledRight.push(newLeft);
            hexagonFilledLeft.push(newRight);
        }
    });

    // sum rows
    const rowSums = hexagon.map(row => row.reduce((s, v) => s + v), 0);

    // sum diagonals
    const diagonalSums = [];
    for (let col = 0; col < size; col++) {
        let sumL = 0;
        let sumR = 0;

        for(let row = 0; row < size; row++) {
            sumL += hexagonFilledLeft[row][col];
            sumR += hexagonFilledRight[row][col];
        }
        diagonalSums.push(sumL, sumR);
    }

    return Math.max(...rowSums, ...diagonalSums);
}


console.log(maxHexagonBeam(2, [1, 2]),4);
console.log(maxHexagonBeam(4, [2, 4, 6, 8]), 34);
console.log(maxHexagonBeam(2, [5, 8, 3, 8]), 24);
console.log(maxHexagonBeam(5, [1,0,4,-6]), 9);