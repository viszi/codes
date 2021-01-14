// https://www.codewars.com/kata/55eeddff3f64c954c2000059
// You are given a list/array which contains only integers (positive and negative). Your job is to sum only the numbers that are the same and consecutive. The result should be one list.
// Extra credit if you solve it in one line. You can assume there is never an empty list/array and there will always be an integer.
// Same meaning: 1 == 1

function sumConsecutives(s) {
    let result = [];
    let counter = 1;
    for (let i = 0; i < s.length; i++) {
        const value = s[i];
        if (value == result[result.length - 1] / counter) {
            result[result.length - 1] += value;
            counter++;
        } else {
            result.push(value);
            counter = 1;
        }
    }
    return result;
}

function sumConsecutives(s) {
    let counter = 1;
    return s.reduce((result, v, i) => {
        if (v == result[result.length - 1] / counter) {
            counter++;
            result[result.length - 1] += v;
            return result;
        } else {
            result.push(v);
            counter = 1;
            return result;
        }
    }, []);
}

console.log(sumConsecutives([1, 4, 4, 4, 0, 4, 3, 3, 1]), [1, 12, 0, 4, 6, 1]);
console.log(sumConsecutives([1, 1, 7, 7, 3]), [2, 14, 3]);
console.log(sumConsecutives([-5, -5, 7, 7, 12, 0]), [-10, 14, 12, 0]);