// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-26-reciprocal-cycles
// A unit fraction contains 1 in the numerator. The decimal representation of the unit fractions with denominators 2 to 10 are given:
// 1/2 = 0.5
// 1/3 = 0.(3)
// 1/4 = 0.25
// 1/5 = 0.2
// 1/6 = 0.1(6)
// 1/7 = 0.(142857)
// 1/8 = 0.125
// 1/9 = 0.(1)
// 1/10 = 0.1
// Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that 1/7 has a 6-digit recurring cycle.
// Find the value of d < n for which 1/d contains the longest recurring cycle in its decimal fraction part.

// mathy way
function reciprocalCycles(n) {

    // helper function
    const divide = divider => {
        let result = '0.';
        let remainder = 10;
        let steps = 1;

        // object to store the occurences of each digits
        // numbers must be the same length as divider
        let occurence = {};
        let store = '';
        let digits = Math.floor(Math.log10(divider))+1;
    
        while (remainder > 0) {
            let value = 0;
            
            // if number can be divided then use the integer value
            if (remainder >= divider) {
                value = Math.floor(remainder / divider);
            }
            
            // add to result the value
            result += value;
    
            if (steps % digits === 0 && steps > 0) {
                store = result.slice(-digits);
                // add to the object the digit 
                // if it is already in it then return the value
                if (!occurence[store]) {
                    occurence[store] = steps;
                } else {
                    return steps -  occurence[store];
                }
            }
    
            remainder -= value * divider;
            remainder *= 10;
            steps++;
        }

        // return steps for whole dividers
        return steps;
    }

    let longestLength = 0;
    let longest = 1;
    let length = 0;

    for (let i = 2; i < n; i++) {
        length = divide(i);
        
        if (length > longestLength) {
            // console.log(`${i} - ${length}`);
            longest = i;
            longestLength = length;
        }
    }

    return longest;
}

console.log(reciprocalCycles(10), 7);
console.log(reciprocalCycles(700), 659);
console.log(reciprocalCycles(800), 743);
console.log(reciprocalCycles(900), 887);
console.log(reciprocalCycles(1000), 983);