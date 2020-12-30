// https://www.youtube.com/watch?v=oBt53YbR9Kk&t=14481s
// create the Fibonacci sequence, return nth value

// Memoization
// without memoization the recursive function will be really slow
// complexity time: O(n), space: O(n)

function fib(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;

    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}


// Tabulation
// we create an array with size of n+1 (due to 0th element)
// we loop through the array and increasing the next 2 cells with the current cell value
// complexity time: O(n) , space: O(n)

function fib(n) {
    const table = Array(n + 1).fill(0);
    table[1] = 1;       // fibonacci starts as 0, 1, 1...

    for (let i = 0; i <= n; i++) {
        // incrementing the next 2 cells with the current cell value
        table[i + 1] += table[i];
        table[i + 2] += table[i];
    }

    return table[n];
}

console.log(fib(7), 13);
console.log(fib(8), 21);
console.log(fib(50), 12586269025);