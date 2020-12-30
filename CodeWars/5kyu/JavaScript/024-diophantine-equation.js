// https://www.codewars.com/kata/554f76dca89983cc400000bb
// In mathematics, a Diophantine equation is a polynomial equation, usually with two or more unknowns, such that only the integer solutions are sought or studied.
// In this kata we want to find all integers x, y (x >= 0, y >= 0) solutions of a diophantine equation of the form:
// x^2 - 4 * y^2 = n
// (where the unknowns are x and y, and n is a given positive number) in decreasing order of the positive xi.

// If there is no solution return [] or "[]" or "". (See "RUN SAMPLE TESTS" for examples of returns).

// Examples:
// solEquaStr(90005) --> "[[45003, 22501], [9003, 4499], [981, 467], [309, 37]]"
// solEquaStr(90002) --> "[]"
// Hint:
// x^2 - 4 * y^2 = (x - 2*y) * (x + 2*y)

// brute force way - timing out for numbers ~200k
function solequa2(n) {

    let result = [];
    let x = Math.floor((n + 1) / 2);
    let y = 0;

    while (x - 2 * y >= 0) {
        const maxY = Math.floor(Math.sqrt((x * x - n) / 4));

        while (y <= maxY) {
            if (n === x * x - 4 * y * y) {
                result.push([x, y]);
                break;   // if a solution was found we can break out
            }
            y++;
        }
        x--;
        y = 0;    // reset y for next x
    }

    return result;
}

// find factors and solve the equation
function solequa(n) {

    let result = [];

    // find factors of the number
    let factors = [[1, n]];

    for (let div = 2; div <= Math.sqrt(n); div++) {
        if (n % div === 0) {
            factors.push([div, n / div]);
        }
    }

    // if (x - 2y) = factor1 and (x + 2y) = factor2, then 2x = factor1 + factor2
    factors.forEach(([f1, f2]) => {
        let x = (f1 + f2) / 2;
        // if x is integer check for y
        if (Number.isInteger(x)) {
            let y = (x - f1) / 2
            // if y is integer too we found a solution
            if (Number.isInteger(y)) {
                result.push([x,y])
            }
        }
    })

    return result;
}

// console.log(solequa(5), [[3, 1]]);
// console.log(solequa(12), [[4, 1]]);
// console.log(solequa(13), [[7, 3]]);
// console.log(solequa(16), [[4, 0]]);
console.log(solequa(90005), [[45003, 22501], [9003, 4499], [981, 467], [309, 37]]);
// console.log(solequa(90002), []);
// console.log(solequa(223232), [[27906, 13951], [13956, 6974], [6984, 3484], [3504, 1736], [1776, 856], [936, 404], [564, 154], [474, 19]]);
// console.log(solequa(448256), [[56034, 28015], [28020, 14006], [14016, 7000], [7020, 3494], [3534, 1735], [3330, 1631], [1716, 790], [960, 344], [750, 169], [684, 70]]);
// console.log(solequa(829728), [[103718, 51857], [51862, 25927], [34578, 17283], [17298, 8637], [11542, 5753], [5798, 2863], [2498, 1163], [1682, 707], [1378, 517], [1062, 273], [1042, 253], [918, 57]]);
// console.log(solequa(2197305), [[1098653, 549326], [366219, 183108], [219733, 109864], [122077, 61034], [99883, 49936], [73251, 36618], [47779, 23878], [33309, 16638], [24437, 12196], [20003, 9974], [15957, 7944], [11147, 5524], [9611, 4748], [6741, 3288], [5789, 2798], [5411, 2602], [4469, 2108], [3357, 1506], [2467, 986], [2187, 804], [1827, 534], [1621, 328], [1579, 272], [1501, 118]]);
// console.log(solequa(9000000041), [[4500000021, 2250000010], [155172429, 77586200]]);

//   runtimes    brute-force  factors
//            5      7 ms
//           12      7 ms
//           13      8 ms 
//           16      8 ms
//        9,005    805 ms    8 ms
//      223,232   6843 ms   16 ms
//      448,256     26 s    16 ms
//      829,728     93 s    24 ms
//    2,197,305             28 ms
//9,000,000,041             13 ms