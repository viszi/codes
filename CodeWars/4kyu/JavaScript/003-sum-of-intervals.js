// https://www.codewars.com/kata/52b7ed099cdc285c300001cd
// Write a function called sumIntervals/sum_intervals() that accepts an array of intervals, and returns the sum of all the interval lengths. Overlapping intervals should only be counted once.
// Intervals
// Intervals are represented by a pair of integers in the form of an array. The first value of the interval will always be less than the second value. Interval example: [1, 5] is an interval from 1 to 5. The length of this interval is 4.

// Overlapping Intervals
// List containing overlapping intervals:

// [  [1,4],
//    [7, 10],
//    [3, 5]    ]

function sumIntervals(intervals) {
    //store the result in an array
    let ranges = [];

    //loop through the interval arrays
    intervals.map((element, index) => {
        //grab the current low and high indecies
        let new_start = element[0];
        let new_end = element[1];

        let match = false;

        //check if the new array contains any overlapping with the new inputs
        for (let i = 0; i < ranges.length; i++) {
            let old_start = ranges[i][0];
            let old_end = ranges[i][1];

            //overlapping when new start is smaller then old end and and new end is bigger then old start
            // e.g  [5, 8] v. [1, 10]
            if (new_start <= old_end && new_end >= old_start) {
                //replace existing end with the new only if it is greater or equal to existing
                match = true;
                if (new_end >= old_end) {
                    ranges[i][1] = new_end;
                }
                //replace existing start with new if it is smaller or equal to existing
                if (new_start <= old_start) {
                    ranges[i][0] = new_start;
                }
            }
        }

        //if there was no overlapping match add the new pair to the result array
        if (!match) {
            ranges.push(Array(new_start, new_end));
        }
    })

    //find duplicate records in the array and set to 0 such records
    ranges.forEach((arr, index, total) => {
        let key1 = arr[0];
        let key2 = arr[1];

        for (let i = index + 1; i < total.length; i++) {
            if (ranges[i][0] === key1 && ranges[i][1] === key2) {
                ranges[i][0] = 0;
                ranges[i][1] = 0;
            }
        }
    })

    //check content of the new array and calculate total length
    return ranges.reduce((total_len, arr) => {
        return total_len += arr[1] - arr[0]
    }, 0)

}

// mások megoldása
function sumIntervals(intervals) {
    const ranges = new Set();
    
    intervals.forEach(([start, end]) => {
      for (let i = start; i < end; i++) ranges.add(i);
    });
    
    return ranges.size;
  }

console.log(sumIntervals([[43, 253], [-129, 365], [496, 498], [486, 490], [-466, 490], [-323, -238], [-219, 337], [-215, 225], [410, 437], [-404, -255], [74, 179], [322, 489], [77, 370]]), 958);
console.log(sumIntervals([[2, 9], [2, 6], [2, 4], [2, 9], [2, 5]]), 7);
console.log(sumIntervals([[1, 20], [2, 19], [5, 15], [8, 12]]), 19);
console.log(sumIntervals([[-259, 367], [-309, 234], [-361, 114], [-303, 12], [-238, 383], [-200, -24], [226, 367], [-27, 374], [-306, -195], [7, 500], [-463, -193], [360, 371], [-258, 341], [-479, 500], [-214, 176], [203, 272], [-368, -26], [-10, 318], [483, 488], [404, 441]]), 979);
console.log(sumIntervals([[11, 15], [6, 10], [1, 2]]), 9);
console.log(sumIntervals([[1, 5]]), 4);
console.log(sumIntervals([[1, 5], [6, 10]]), 8);
console.log(sumIntervals([[1, 5], [1, 5]]), 4);
console.log(sumIntervals([[1, 4], [7, 10], [3, 5]]), 7);