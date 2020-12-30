// https://www.codewars.com/kata/5819f1c3c6ab1b2b28000624
// The Padovan sequence is the sequence of integers P(n) defined by the initial values
// P(0)=P(1)=P(2)=1
// and the recurrence relation
// P(n)=P(n-2)+P(n-3)
// The first few values of P(n) are
// 1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12, 16, 21, 28, 37, 49, 65, 86, 114, 151, 200, 265, ...
// The task is to write a method that returns i-th Padovan number for i around 1,000,000

// fails on BIG numbers
function padovan(n) {
    let table = Array(n + 1).fill(0n);
    table[0] = BigInt(1);
    table[1] = BigInt(1);
    table[2] = BigInt(1);

    for (let i = 3; i <= n; i++) {
        table[i] += table[i - 2] + table[i - 3];
    }
    return table[n];
}

function padovan(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n < 3) return BigInt(1);

    memo[n] = padovan(n - 2, memo) + padovan(n - 3, memo);
    return memo[n];
}

function padovan(n) {
    const padovans = [1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12, 16, 21, 28, 37, 49, 65, 86, 114, 151, 200, 265];
    const plasticRatio = 1.324717957244746025960908854;

    if (n < 21) {
        return padovans[n]
    } else {
        return Math.round(200 * plasticRatio ** (n - 20));
    }
}

console.log(padovan(11), 16);
console.log(padovan(30), 3329);
console.log(padovan(50), 922111);
console.log(padovan(67), 109870576);
console.log(padovan(100), 1177482265857n);
//console.log(String(padovan(1000000)).length, 122124);

