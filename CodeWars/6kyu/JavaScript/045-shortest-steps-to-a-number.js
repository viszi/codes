// https://www.codewars.com/kata/5cd4aec6abc7260028dcd942
// Given a number, num, return the shortest amount of steps it would take from 1, to land exactly on that number.
// xA step is defined as either:
// Adding 1 to the number: num += 1
// Doubling the number: num *= 2

function shortestStepsToNum(num) {
    common = {
        1: [0, ''],
        2: [1, '+1'],
        3: [2, '+1 +1'],
        5: [3, '+1 x2 +1'],
        7: [4, '+1 +1 x2 +1'],
        9: [4, '+1 x2 x2 +1']
    }

    let steps = 0;
    let result = [];

    while (num >=1) {
        if (num in common){
            steps += common[num][0];
            result.push(common[num][1]);
            break;
        }

        if (num % 2 === 0) {
            num /= 2;
            result.push('2x');
        } else {
            num -= 1;
            result.push('+1');
        }
        steps += 1;
    }

    console.log(`Steps: ${result.reduceRight((r, s) => r += s + " ", " ").trim()}`);
    return steps
}

console.log(shortestStepsToNum(71), 9);
console.log(shortestStepsToNum(12), 4);
console.log(shortestStepsToNum(1), 0);
console.log(shortestStepsToNum(7), 4);
console.log(shortestStepsToNum(16), 4);