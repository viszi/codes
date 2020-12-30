// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-24-lexicographic-permutations
// A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:
// 012   021   102   120   201   210
// What is the nth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?

function lexicographicPermutations(n) {
    
    let combinations = [];

    // https://en.wikipedia.org/wiki/Permutation#Generation_in_lexicographic_order
    let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    combinations.push(a.join(''));

    while (combinations.length < n + 1) {
        // 1. Find the largest index k such that a[k] < a[k + 1]. If no such index exists, the permutation is the last permutation.
        let k = -1;
        for (let i = 0; i < a.length - 1; i++) {
            if (a[i] < a[i + 1]) {
                k = i;
            }
        }

        if (k === -1) {
            break;
        }
        
        // 2. Find the largest index l greater than k such that a[k] < a[l].
        let l = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[k] < a[i]) {
                l = i;
            }
        }

        // 3. Swap the value of a[k] with that of a[l].
        let temp = a[l];
        a[l] = a[k];
        a[k] = temp;

        // 4. Reverse the sequence from a[k + 1] up to and including the final element a[n].
        let first = a.slice(0, k + 1);
        let reversed = a.slice(k + 1).reverse();
        a = first.concat(reversed);

        combinations.push(a.join(''));
    }


    return +combinations[n];
}

function lexicographicPermutations(n) {
    
    let counter = 1;
    let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    while (true) {
        // 1. Find the largest index k such that a[k] < a[k + 1]. If no such index exists, the permutation is the last permutation.
        let k = -1;
        for (let i = 0; i < a.length - 1; i++) {
            if (a[i] < a[i + 1]) {
                k = i;
            }
        }

        if (k === -1) {
            break;
        }
        
        // 2. Find the largest index l greater than k such that a[k] < a[l].
        let l = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[k] < a[i]) {
                l = i;
            }
        }

        // 3. Swap the value of a[k] with that of a[l].
        let temp = a[l];
        a[l] = a[k];
        a[k] = temp;

        // 4. Reverse the sequence from a[k + 1] up to and including the final element a[n].
        let first = a.slice(0, k + 1);
        let reversed = a.slice(k + 1).reverse();
        a = first.concat(reversed);
        
        if (counter === n) {
            return +a.join('');
        }
        counter++;
    }
}

console.log(lexicographicPermutations(699999), 1938246570);
console.log(lexicographicPermutations(899999), 2536987410);
console.log(lexicographicPermutations(900000), 2537014689);
console.log(lexicographicPermutations(999999), 2783915460);

//          using array    without array
// 699999      485 ms         200 ms
// 999999      719 ms         279 ms
// better solution on https://www.xarg.org/puzzle/project-euler/problem-24/