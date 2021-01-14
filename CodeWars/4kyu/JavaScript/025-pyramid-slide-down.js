// https://www.codewars.com/kata/551f23362ff852e2ab000037
// /3/
// \7\ 4 
// 2 \4\ 6 
// 8 5 \9\ 3
// Here comes the task...
// Let's say that the 'slide down' is the maximum sum of consecutive numbers from the top to the bottom of the pyramid. As you can see, the longest 'slide down' is 3 + 7 + 4 + 9 = 23
// Your task is to write a function longestSlideDown (in ruby/crystal/julia: longest_slide_down) that takes a pyramid representation as argument and returns its' largest 'slide down'. For example,
// longestSlideDown([[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]]) => 23

// this version is timing out on long pyramids
// generating all possible routes 
function longestSlideDown(pyramid) {
    let combinations = [pyramid[0][0]];
    let indexes = [0];

    for (let i = 1; i < pyramid.length; i++) {
        let combos = [];
        let paths = [];

        while (indexes.length > 0) {
            let lastCombo = combinations.pop();
            let lastIndex = indexes.pop();

            const pathA = Math.max(0, lastIndex);
            const pathB = Math.min(lastIndex + 1, pyramid[i].length - 1);

            paths.push(pathA, pathB);

            if (Array.isArray(lastCombo)) {
                combos.push([...lastCombo, pyramid[i][pathA]]);
                combos.push([...lastCombo, pyramid[i][pathB]]);
            } else {
                combos.push([lastCombo, pyramid[i][pathA]]);
                combos.push([lastCombo, pyramid[i][pathB]]);
            }

        }
        combinations = combos.slice();
        indexes = paths.slice();
    }

    let slides = combinations.map(v => v.reduce((s, v) => s += v, 0));
    let m = slides.indexOf(Math.max(...slides));
    console.log(combinations[m]);
    return Math.max(...slides);
}

// https://www.programmersought.com/article/55385235949/ 
// build the path from the bottom to the top
function longestSlideDown(pyramid) {

    let lastRow = pyramid.pop();

    while (pyramid.length > 0) {
        let prevRow = pyramid.pop();

        // find the max combo based on the two rows
        lastRow = prevRow.map((v, i) => {
            return Math.max(v + lastRow[i], v + lastRow[i + 1]);
        })
    }
    return lastRow[0];
}

console.log(longestSlideDown([[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]]), 23);
console.log(longestSlideDown([
    [75],
    [95, 64],
    [17, 47, 82],
    [18, 35, 87, 10],
    [20, 4, 82, 47, 65],
    [19, 1, 23, 75, 3, 34],
    [88, 2, 77, 73, 7, 63, 67],
    [99, 65, 4, 28, 6, 16, 70, 92],
    [41, 41, 26, 56, 83, 40, 80, 70, 33],
    [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
    [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
    [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
    [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
    [63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
    [4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23]
]), 1074);