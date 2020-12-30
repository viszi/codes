// https://www.youtube.com/watch?v=oBt53YbR9Kk&t=14481s
// we begin on top left corner and can move only down and right
// how many ways we can move

// Memoization
// complexity time: O(2^m+n) / we have two paths, space: O(m+n)

function gridTraveler(m, n, memo = {}) {
    const key = m + ',' + n;

    if (key in memo) return memo[key];
    if (m === 1 && n === 1) return 1;
    if (m === 0 || n === 0) return 0;

    memo[key] = gridTraveler(m - 1, n, memo) + gridTraveler(m, n - 1, memo);
    return memo[key];
}

// Tabulation
// using a 2D array with +1 dimensions
// using the current position we add current cell value to neighbours to the right and down
// complexity time: O(m*n), space: O(m*n)

function gridTraveler(m, n) {
    const table = Array(m + 1)
        .fill(0)
        .map(() => Array(n + 1).fill(0));

    table[1][1] = 1;            // this is the starting position and we have 1 way

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            const current = table[i][j];
            if (j + 1 <= n) table[i][j + 1] += current;       // right neighbour - checking the edges
            if (i + 1 <= m) table[i + 1][j] += current;       // down neighbour - checking the edges 
        }
    }

    return table[m][n];
}

console.log(gridTraveler(1, 1), 1);
console.log(gridTraveler(2, 3), 3);
console.log(gridTraveler(3, 2), 3);
console.log(gridTraveler(3, 3), 6);
console.log(gridTraveler(18, 18), 2333606220);