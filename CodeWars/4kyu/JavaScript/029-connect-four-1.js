// https://www.codewars.com/kata/56882731514ec3ec3d000009
// The grid is 6 row by 7 columns, those being named from A to G.

// You will receive a list of strings showing the order of the pieces which dropped in columns:

//   piecesPositionList = ["A_Red",
//                         "B_Yellow",
//                         "A_Red",
//                         "B_Yellow",
//                         "A_Red",
//                         "B_Yellow",
//                         "G_Red",
//                         "B_Yellow"]
// The list may contain up to 42 moves and shows the order the players are playing.

// The first player who connects four items of the same color is the winner.

// You should return "Yellow", "Red" or "Draw" accordingly.

function whoIsWinner(piecesPositionList) {
    let grid = [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ];

    const checkRow = (player, row) => {
        for (let i = 0; i < 4; i++) {
            if (grid[row][i] === player && grid[row][i + 1] === player &&
                grid[row][i + 2] === player && grid[row][i + 3] === player) return true;
        }
        return false;
    }

    const checkColumn = (player, column) => {
        for (let i = 0; i < 3; i++) {
            if (grid[i][column] === player && grid[i + 1][column] === player &&
                grid[i + 2][column] === player && grid[i + 3][column] === player) return true;
        }
        return false
    }

    const checkDiagonal = (player, row, column) => {
        const diff = Math.abs(row - column);
        for (let i = 0; i < 4; i++) {
            // check one diagonal
            if (i + 3 <= 5 && diff + i + 3 <= 7) {
                if (grid[i][diff + i] === player && grid[i + 1][diff + i + 1] === player &&
                    grid[i + 2][diff + i + 2] === player && grid[i + 3][diff + i + 3] === player) return true;
            }
            // check other diagonal
            if (diff + 1 <= 5 && i + 3 <= 7) {
                if (grid[diff + i][i] === player && grid[diff + i + 1][i + 1] === player &&
                    grid[diff + i + 2][i + 2] === player && grid[diff + i + 3][i + 3] === player) return true;
            }
        }
        return false;
    };

    for (let i = 0; i < piecesPositionList.length; i++) {
        const next = piecesPositionList[i];
        const index = next[0];
        const column = index.charCodeAt(0) - 65;
        const player = next.split("_")[1];

        // find first empty position in the given column
        const row = grid.reduce((c, line) => c += (line[column] > ''), 0);

        // add player to the given position
        grid[row][column] = player;

        // check for 4 connect
        if (i > 3) {
            if (checkRow(player, row)) return player;
            if (checkColumn(player, column)) return player;
            if (checkDiagonal(player, row, column)) return player;
        }
    }
    return "Draw";
}


console.log(whoIsWinner(["C_Yellow",
    "E_Red",
    "G_Yellow",
    "B_Red",
    "D_Yellow",
    "B_Red",
    "B_Yellow",
    "G_Red",
    "C_Yellow",
    "C_Red",
    "D_Yellow",
    "F_Red",
    "E_Yellow",
    "A_Red",
    "A_Yellow",
    "G_Red",
    "A_Yellow",
    "F_Red",
    "F_Yellow",
    "D_Red",
    "B_Yellow",
    "E_Red",
    "D_Yellow",
    "A_Red",
    "G_Yellow",
    "D_Red",
    "D_Yellow",
    "C_Red"]), "Yellow");
console.log(whoIsWinner(["A_Yellow",
    "B_Red",
    "B_Yellow",
    "C_Red",
    "G_Yellow",
    "C_Red",
    "C_Yellow",
    "D_Red",
    "G_Yellow",
    "D_Red",
    "G_Yellow",
    "D_Red",
    "F_Yellow",
    "E_Red",
    "D_Yellow"]), "Red");
console.log(whoIsWinner(["A_Red",
    "B_Yellow",
    "A_Red",
    "E_Yellow",
    "F_Red",
    "G_Yellow"]), "Draw");
console.log(whoIsWinner(["A_Red",
    "C_Red",
    "D_Red",
    "B_Yellow",
    "A_Red",
    "A_Red",
    "A_Red"
]), "Red");
console.log(whoIsWinner(["A_Yellow",
    "C_Red",
    "D_Red",
    "F_Yellow",
    "B_Red",
    "G_Yellow",
    "E_Red"
]), "Red");
