// https://www.codewars.com/kata/563e320cee5dddcf77000158
// It's the academic year's end, fateful moment of your school report. The averages must be calculated. All the students come to you and entreat you to calculate their average for them. Easy ! You just need to write a script.
// Return the average of the given array rounded down to its nearest integer.
// The array will never be empty.

function getAverage(marks) {

    let sum = 0;

    //iterate over the array and sum it
    for (let i = 0; i < marks.length; i++) {
        sum += marks[i];
    }

    let result = Math.floor(sum / marks.length);

    return result
}

function getAverage(marks) {
    //use reduce
    let sum = marks.reduce((sum, current) => {
        return sum += current
    })

    let result = Math.floor(sum / marks.length);

    return result
}

console.log(getAverage([2, 2, 2, 2]), 2);
console.log(getAverage([1, 2, 3, 4, 5,]), 3);
console.log(getAverage([1, 1, 1, 1, 1, 1, 1, 2]), 1);