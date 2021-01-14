// https://www.codewars.com/kata/525fbff0594da0665c0003a3
// Given a 2D array and a number of generations, compute n timesteps of Conway's Game of Life.

// The rules of the game are:
// 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// 2. Any live cell with more than three live neighbours dies, as if by overcrowding.
// 3. Any live cell with two or three live neighbours lives on to the next generation.
// 4. Any dead cell with exactly three live neighbours becomes a live cell.
// ...implement your own method which will take the initial state as an NxM array of 0's (dead cell) and 1's (living cell) and return an equally sized array representing the next generation. Cells outside the array must be considered dead. Cells that would born out of the array boundaries should be ignored (universe never grows beyond the initial NxM grid).

function nextGen(cells) {

    let previousCells = [...cells];

    // get neighbours for a cell
    const getNeighbours = (row, col, array) => {
        let result = [];
        const maxRow = array.length;
        const maxCol = array[0].length;
        // add top left
        if (row > 0 && col > 0) result.push(array[row - 1][col - 1]);
        // add top
        if (row > 0) result.push(array[row - 1][col]);
        // add top right
        if (row > 0 && col < maxCol - 1) result.push(array[row - 1][col + 1]);
        // add left
        if (col > 0) result.push(array[row][col - 1]);
        // add right
        if (col < maxCol - 1) result.push(array[row][col + 1]);
        // add bottom left
        if (row < maxRow - 1 && col > 0) result.push(array[row + 1][col - 1]);
        // add bottom
        if (row < maxRow - 1) result.push(array[row + 1][col]);
        // add bottom right
        if (row < maxRow - 1 && col < maxCol - 1) result.push(array[row + 1][col + 1]);

        return result;
    }

    // calculate next cells
    let nextCells = previousCells.map((rowValue, row, arr) => {
        return rowValue.map((value, col) => {
            const liveNeighbours = getNeighbours(row, col, arr).reduce((s, v) => s += v, 0);

            // cells with 3 liveNeighbours will lives
            if (liveNeighbours === 3 || (liveNeighbours === 2 && value)) {
                return 1;
            } else {
                return 0;
            }
        });
    });

    return nextCells;
}

// reworked version
function nextGen(cells) {

    const liveNeighbours = (row, col, array) => {
        const maxRow = array.length - 1;
        const maxCol = array[0].length - 1;

        let live = -array[row][col];

        for (let rowx = -1; rowx < 2; rowx++) {
            for (let colx = -1; colx < 2; colx++) {
                if (row + rowx >= 0 && row + rowx <= maxRow && col + colx >= 0 && col + colx <= maxCol) {
                    live += array[row + rowx][col + colx];
                }
            }
        }
        return live;
    };

    let nextCells = cells.map((rowValue, row, array) => {
        return rowValue.map((value, col) => {
            const live = liveNeighbours(row, col, array);
            if (live === 3 || (live === 2 && value)) {
                return 1;
            } else {
                return 0;
            }
        })
    })

    return nextCells;
}

console.log(nextGen([
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
]));

console.log(nextGen([
    [1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]));
