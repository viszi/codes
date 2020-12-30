// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-14-longest-collatz-sequence
// The following iterative sequence is defined for the set of positive integers:
// n → n/2 (n is even)
// n → 3n + 1 (n is odd)
// Using the rule above and starting with 13, we generate the following sequence:
// 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
// It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.
// Which starting number, under the given limit, produces the longest chain?


// brute-force
function longestCollatzSequence(limit) {

    let longestNumber = 1;
    let longestLength = 1;
    let longestSequence = [];
    // let counter = 0;

    for (let i = 1; i < limit; i++) {

        let number = i;
        let sequence = [number];
        let length = 1;

        // generate Collatz numbers and count their length
        while (number > 1) {

            if (number % 2 === 0) {
                number /= 2;
            } else {
                number = 3 * number + 1;
            }

            sequence.push(number);
            length++;
            // counter++;
        }

        // store the longest iteration data
        if (length > longestLength) {
            longestLength = length;
            longestNumber = i;
            longestSequence = [...sequence];
        }
    };

    // console.log(`Iterations: ${counter}`);
    return longestNumber;
}

// use an object to store already found value
function longestCollatzSequence(limit) {

    let longest = 1;
    let longestNum = 1;
    let cache = { '1': 1 };
    // let counter = 0;

    const countCollatz = (number, hash) => {
        let steps = 1;

        while (number > 1) {
            if(hash[number]) {
                return steps + hash[number]
            }
            number = (number % 2 === 0) ? number /= 2 : 3 * number + 1;
            steps++;
            // counter++;
        }
        return steps;
    }


    for (let i = 2; i < limit; i++) {
        let count;
        
        if(cache[i]) {
            count = cache[i];
        } else {
            count = countCollatz(i, cache);
            cache[i] = count;
        }

        if(count > longest){
            longest = count;
            longestNum = i;
        } 
            

    }
    // console.log(`Iterations: ${counter}, Hash size: ${Object.keys(cache).length}`);
    return longestNum;
}


console.log(longestCollatzSequence(14), 9);
console.log(longestCollatzSequence(5847), 3711);
console.log(longestCollatzSequence(46500), 35655);
console.log(longestCollatzSequence(54512), 52527);
console.log(longestCollatzSequence(100000), 77031);
console.log(longestCollatzSequence(1000000), 837799);

//                       Normal way             Using a hash
// Iterations / runtime: 99 (9 ms)              40 (8 ms)
//                       462,191 (15 ms)        30,328 (14 ms)
//                       4,639,715 (38 ms)      241,994 (22 ms)
//                       5,521,071 (44 ms)      283,454 (22 ms) 
//                       10,753,712 (70 ms)     520,910 (30 ms)
//                       131,434,272 (2780 ms)  5,226,259 (375 ms) 

