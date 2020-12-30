// https://www.codewars.com/kata/554b4ac871d6813a03000035
// In this little assignment you are given a string of space separated numbers, and have to return the highest and lowest number.
// highAndLow("1 2 3 4 5");  // return "5 1"
// highAndLow("1 2 -3 4 5"); // return "5 -3"
// highAndLow("1 9 3 4 -5"); // return "9 -5"

function highAndLow(numbers) {
    let highest = -Infinity;
    let lowest = Infinity;

    // loop through the array and find lowest and highest
    numbers.split(' ').forEach(value => {
        let current = +value;
        if (current > highest) highest = current;
        if (current < lowest) lowest = current;
    });

    return '' + highest + ' ' + lowest
}

function highAndLow(numbers) {
    // sort the input
    let sorted = numbers.split(' ').sort((a, b) => a - b);
    
    // get the last and first element
    return sorted[sorted.length - 1] + ' ' + sorted[0]
}


console.log(highAndLow("4 5 29 54 4 0 -214 542 -64 1 -3 6 -6"), "542 -214");