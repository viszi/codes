// https://www.codewars.com/kata/54d4c8b08776e4ad92000835
// For a perfect power, there might be several pairs. For example 81 = 3^4 = 9^2, so (3,4) and (9,2) are valid solutions. However, the tests take care of this, so if a number is a perfect power, return any pair that proves it.

var isPP = function (n) {

    for (let m = 2; m <= Math.sqrt(n); m++) {
        const k = Math.log10(n) / Math.log10(m);
        if ((n - m ** Math.round(k)) == 0) return [m, Math.round(k)];
    }

    return null;
}
console.log(isPP(125), [5, 3]);
console.log(isPP(32768), [[2, 15], [8, 5]]);
// console.log(isPP(493039), [79,3]);
// console.log(isPP(4), [2, 2], "4 = 2^2");
// console.log(isPP(9), [3, 2], "9 = 3^2");
// console.log(isPP(5), null, "5 isn't");
