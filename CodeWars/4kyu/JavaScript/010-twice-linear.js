// https://www.codewars.com/kata/5672682212c8ecf83e000050
// The number u(0) = 1 is the first one in u.
// For each x in u, then y = 2 * x + 1 and z = 3 * x + 1 must be in u too.
// There are no other numbers in u.
// Ex: u = [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, ...]
// 1 gives 3 and 4, then 3 gives 7 and 10, 4 gives 9 and 13, then 7 gives 15 and 22 and so on...


// THIS ONE TIMES OUT //
function dblLinear(num) {
    let nums = [];
    let result = [1];

    let x = 1;

    // generate double and triple linear
    while (result.length < num + 1) {
        let two_times = 2 * x + 1;
        let three_times = 3 * x + 1;

        // add them to interim array
        nums.push(two_times, three_times);

        // sort interim array in reverese order
        // THIS IS SLOWING DOWN THE PROCESS
        nums.sort((a, b) => b - a);

        // get smallest x
        x = nums.pop()

        // add to result if it is not added yet
        if (!result.includes(x)) {
            result.push(x);
        }
    }

    return result.pop();
}

function dblLinear(num) {
    let nums = [];
    let result = new Set();
    result.add(1);

    let x = 1;

    // generate double and triple linear
    while (result.size < num + 1) {
        let two_times = 2 * x + 1;
        let three_times = 3 * x + 1;

        // add them to interim array
        nums.push(two_times, three_times);

        // sort interim array in reverese order
        // THIS IS SLOWING DOWN THE PROCESS
        nums.sort((a, b) => b - a);

        // get smallest x
        x = nums.shift()

        // add to result if it is not added yet
        result.add(x);
    }

    return [...result].pop();
}

// STILL TIMES OUT
function dblLinear(num) {
    let nums = [];
    let result = [1];

    let x = 1;
    let position = 0;

    // generate double and triple linear
    while (result.length < num + 1) {
        let two_times = 2 * x + 1;
        let three_times = 3 * x + 1;

        // check if generated number is not in interim array yet
        if (!nums.includes(two_times)) {
            let found = false;
            // add to the correct place
            for(let i = position; i < nums.length; i++){
                if (nums[i] > two_times) {
                    position = i;
                    found = true;
                    break;
                }
            }

            // insert two_times into the next position
            if (found) {
                nums.splice(position, 0, two_times);
            } else {
                nums.push(two_times);
            }
        }

        nums.push(three_times);

        // get smallest x
        x = nums.shift();

        // add to result if it is not added yet
        if (!result.includes(x)) {
            result.push(x);
        }
    }

    return result.pop();
}

// Coding Garden's solution https://github.com/CodingGarden/code-katas/blob/master/episode_008/twice-linear.js
function dblLinear(n) {
    // a place to store the sequence
    const sequence = [1]; // start the sequence with 1
    const seen = {};
    // a place to keep track of the length, set to 0
    let length = 0;
    let last = 0;
  
    // while length is less than n
    while (length < n) {
      const x = sequence.shift(); // remove first value from array
      delete seen[x]; // remove from seen
      // calculate y given the current x
      const y = 2 * x + 1;
      // insert y into the sequence in sorted order
      if (!seen[y]) {
        for (var i = last; i < sequence.length; i++) {
          if (sequence[i] > y) {
            break;
          }
        }
        sequence.splice(i, 0, y);
        seen[y] = true;
        last = i;
      }
      // calcuate z given the current x
      const z = 3 * x + 1;
      // insert z into the sequence in sorted order
      sequence.push(z);
      seen[z] = true;
      // increase length
      length++;
    }
    return sequence[0]; // return the first value in the array
  }

console.log(dblLinear(10), 22);
console.log(dblLinear(20), 57);
console.log(dblLinear(30), 91);
console.log(dblLinear(50), 175);
console.log(dblLinear(100), 447);
console.log(dblLinear(22), 63);
console.log(dblLinear(57), 223);
console.log(dblLinear(91), 381);
console.log(dblLinear(175), 895);
console.log(dblLinear(447), 2998);
console.log(dblLinear(3355), 38515);
console.log(dblLinear(8488), 125445);
console.log(dblLinear(19773), 368578);
console.log(dblLinear(80914), 2225425);