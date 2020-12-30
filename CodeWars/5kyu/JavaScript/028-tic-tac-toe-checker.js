// https://www.codewars.com/kata/525caa5c1bf619d28c000335
// If we were to set up a Tic-Tac-Toe game, we would want to know whether the board's current state is solved, wouldn't we? Our goal is to create a function that will check that for us!
// Assume that the board comes in the form of a 3x3 array, where the value is 0 if a spot is empty, 1 if it is an "X", or 2 if it is an "O", like so:
// [[0, 0, 1],
//  [0, 1, 2],
//  [2, 1, 0]]
// We want our function to return:

// -1 if the board is not yet finished (there are empty spots),
// 1 if "X" won,
// 2 if "O" won,
// 0 if it's a cat's game (i.e. a draw).
// You may assume that the board passed in is valid in the context of a game of Tic-Tac-Toe.

function isSolved(board) {

    let emptyPlaces = 0;

    // check each rows
    for (let i = 0; i < 3; i++) {
        const a = board[i];

        emptyPlaces += a.reduce((s, v) => s += (v === 0) ? 1 : 0, 0);

        if (a[0] !== 0 && a[0] === a[1] && a[0] === a[2]) {
            return a[0] === 1 ? 1 : 2;
        }
    };

    // check each columns
    for (let i = 0; i < 3; i++) {
        const a = [board[0][i], board[1][i], board[2][i]];

        if (a[0] !== 0 && a[0] === a[1] && a[0] === a[2]) {
            return a[0] === 1 ? 1 : 2;
        }
    };

    // check the 2 diagonals
    let a = [board[0][0], board[1][1], board[2][2]];
    if (a[0] !== 0 && a[0] === a[1] && a[0] === a[2]) {
        return a[0] === 1 ? 1 : 2;
    }
    a = [board[0][2], board[1][1], board[2][0]];
    if (a[0] !== 0 && a[0] === a[1] && a[0] === a[2]) {
        return a[0] === 1 ? 1 : 2;
    }

    return emptyPlaces === 0 ? 0 : -1;
}

console.log(isSolved([
    [0, 0, 1],
    [0, 1, 2],
    [2, 1, 0]]), -1);

console.log(isSolved([
    [2, 2, 2],
    [0, 1, 1],
    [1, 0, 0]]), 2);

console.log(isSolved([
    [2, 1, 2],
    [2, 1, 1],
    [1, 2, 1]]), 0);