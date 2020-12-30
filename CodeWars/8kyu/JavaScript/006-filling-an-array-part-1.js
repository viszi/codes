// https://www.codewars.com/kata/571d42206414b103dc0006a1
// Write a function that produces an array with the numbers 0 to N-1 in it.
// arr(5) // => [0,1,2,3,4]

function arr(n) {
    let result = [];

    for (let i = 0; i < n; i++) {
        result.push(i)
    }

    return result;
}

function arr(n) {
    return Array.from({length: n}).map((_, i) => i);
}

console.log(arr(5));