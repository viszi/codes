// https://www.codewars.com/kata/5270d0d18625160ada0000e4
// Greed is a dice game played with five six-sided dice. Your mission, should you choose to accept it, is to score a throw according to these rules. You will always be given an array with five six-sided dice values.
//  Three 1's => 1000 points
//  Three 6's =>  600 points
//  Three 5's =>  500 points
//  Three 4's =>  400 points
//  Three 3's =>  300 points
//  Three 2's =>  200 points
//  One   1   =>  100 points
//  One   5   =>   50 point
// A single die can only be counted once in each roll. For example, a given "5" can only count as part of a triplet (contributing to the 500 points) or as a single 50 points, but not both in the same roll.

function score(dice) {
    const vals = {}
    const SCORING = {
        1: [100, 1000],
        2: [0, 200],
        3: [0, 300],
        4: [0, 400],
        5: [50, 500],
        6: [0, 600]
    }

    let sum = 0;

    dice.forEach(val => {
        if (val in vals) {
            vals[val] += 1
        } else {
            vals[val] = 1
        }
    });

    for (const [k, v] of Object.entries(vals)) {
        let score = 0;
        if (v >= 3) {
            score = SCORING[k][1] + SCORING[k][0] * Math.max(0, v - 3);
        } else {
            score = SCORING[k][0] * v;
        }
        sum += score;
    }

    return sum
}

console.log(score([5, 1, 3, 4, 1]), 250);
console.log(score([1, 1, 1, 3, 1]), 1100);
console.log(score([2, 3, 4, 6, 2]), 0, "Should be 0 :-(");
console.log(score([4, 4, 4, 3, 3]),  400, "Should be 400");
console.log(score([2, 4, 4, 5, 4]), 450, "Should be 450");
