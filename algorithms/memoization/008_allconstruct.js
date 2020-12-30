// https://www.youtube.com/watch?v=oBt53YbR9Kk&t=14481s
// write a function that returns a 2D array containing all of the ways that the target can be constucted by concatenating elemenets of wordbank

function allConstruct(target, wordBank, memo = {}) {
    if (target in memo) return memo[target];

    if (target === '') return [[]];

    const result = []; 

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            const suffixWays = allConstruct(suffix, wordBank, memo);            
            const targetWays = suffixWays.map(way => [word, ...way]);      // we add all returned arrays the original word
            result.push(...targetWays)
        }
    }

    memo[target] = result;
    return result;
}

console.log(allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl']));
console.log(allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c']));
console.log(allConstruct('skaterboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
console.log(allConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']));
console.log(allConstruct('eeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee']));