// https://www.codewars.com/kata/51ba717bb08c1cd60f00002f
// A format for expressing an ordered list of integers is to use a comma separated list of either
//  - individual integers
//  - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'. The range includes all integers in the interval including both endpoints. It is not considered a range unless it spans at least 3 numbers. For example "12,13,15-17"
// Complete the solution so that it takes a list of integers in increasing order and returns a correctly formatted string in the range format.
// solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
// // returns "-6,-3-1,3-5,7-11,14,15,17-20"

function solution(list) {
    let previous = list[0];
    let subRange = [];

    // store result in array
    let result = [previous];

    for (i = 1; i < list.length; i++) {
        // get the next number
        let actual = list[i];

        // if it is the next number
        if (Math.abs(actual - previous) === 1) {
            // add numbers in a range to an array
            // during first initialization we have to add previous value too
            if (subRange.length === 0) {
                subRange.push(previous);
            }
            subRange.push(actual);
        } else {
            // if next number breaks a range add the range to result
            if (subRange.length > 0) {
                // remove the last element and replace it with correct range
                result.pop();

                // if there is only 2 elements in the subrange add both to the result
                if (subRange.length === 2) {
                    result.push(subRange[0], subRange[1]);
                } else {
                    // for more than 2 elements add the ends of the range
                    result.push(`${subRange.shift()}-${subRange.pop()}`)
                }
                // reset the subrange
                subRange = [];
            }

            // push the actual number to the result
            result.push(actual);
        }

        previous = actual;

        // if we reached the last item and we have a subrange then we have to add it
        if (i === list.length - 1 && subRange.length > 0) {
            // replace the last element with the subRange data
            result.pop();
            if (subRange.length === 2) {
                result.push(subRange[0], subRange[1]);
            } else {
                result.push(`${subRange.shift()}-${subRange.pop()}`)
            }
        }

    }

    return result.join(',');
}

console.log(solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]), "  =>    -6,-3-1,3-5,7-11,14,15,17-20");