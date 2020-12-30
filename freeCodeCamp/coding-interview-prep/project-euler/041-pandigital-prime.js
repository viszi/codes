// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-41-pandigital-prime
// We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once. For example, 2143 is a 4-digit pandigital and is also prime.
// What is the largest n-length digit pandigital prime that exists?

function pandigitalPrime(n) {

    let combinations = new Set();

    // https://en.wikipedia.org/wiki/Permutation#Generation_in_lexicographic_order
    let a = Array.from({ length: n }).map((_, i) => i + 1);
    combinations.add(+a.join(''));

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

        combinations.add(+a.join(''));
    }

    const isPrime = number => {
        if (number < 2) return false;
        if (number > 2 && number % 2 === 0) return false;
        
        for (let div = 3; div <= Math.sqrt(number); div +=2) {
            if (number % div === 0) return false;
        }
        return true;
    }

    let maxValue = 0;

    combinations.forEach( value => {
        if (isPrime(value)) {
            maxValue = (value > maxValue) ? value : maxValue;
        }
    })

    return maxValue;
}

console.log(pandigitalPrime(4), 4231);
console.log(pandigitalPrime(7), 7652413);