// https://www.codewars.com/kata/59971e64bfccc70748000068
// 1, 2, 4, 8, 16, 22, 26, 38, 62, 74, 102, 104, 108, 116, 122

// It is generated as follows:
// - For single digit integers, add the number to itself to get the next element.
// - For other integers, multiply all the non-zero digits and add the result to the original number to get the next element.

// Let's begin the same series with a seed value of 3 instead of 1:
// 3, 6, 12, 14, 18, 26, 38, 62, 74, 102, 104, 108, 116, 122

// Notice that the two sequences converge at 26 and are identical therefter. We will call the series seeded by a value of 1 the "base series" and the other series the "test series".

// You will be given a seed value for the test series and your task will be to return the number of integers that have to be generated in the test series before it converges to the base series. In the case above:
// convergence(3) = 5, the length of [3, 6, 12, 14, 18]. 

function convergence(number) {

    const nextElement = num => {
        if (num < 10) return num * 2;
        return num + String(num).split('').reduce((s, v) => s *= +(v == 0 ? 1 : v), 1)
    }

    let counter = 0;
    let baseSeries = [1];
    let baseSeriesNext = 1;
    let testSeriesNext = number;

    // loop until we are not finding the number in the baseseries
    while (!baseSeries.includes(testSeriesNext)) {
        // make sure we are catching up with the base series
        while (baseSeriesNext < testSeriesNext) {
            baseSeriesNext = nextElement(baseSeriesNext);
            baseSeries.push(baseSeriesNext);
        }
        if (baseSeries.includes(testSeriesNext)) return counter;
        counter++;
        testSeriesNext = nextElement(testSeriesNext)
    }
    return counter
}

console.log(convergence(3), 5);
console.log(convergence(5), 6);
console.log(convergence(15), 2);
console.log(convergence(500), 29);
console.log(convergence(5000), 283);