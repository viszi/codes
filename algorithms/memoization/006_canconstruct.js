// https://www.youtube.com/watch?v=oBt53YbR9Kk&t=14481s
// write a function that checks if target string can be generated from the wordBank in the given array

function canConstruct(target, wordBank, memo = {}) {
    if (target in memo) return memo[target];

    if (target === '') return true;

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {               // the target must start with the word
            const suffix = target.slice(word.length);   // we need only the remaining part of the target
            if (canConstruct(suffix, wordBank, memo) === true) {
                memo[target] = true;
                return true
            }
        }
    }

    memo[target] = false;
    return false;
}

console.log(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']), true);
console.log(canConstruct('skaterboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']), false);
console.log(canConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']), true);
console.log(canConstruct('eeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee','eeee']), false);