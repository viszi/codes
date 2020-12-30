// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-39-integer-right-triangles
// If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.
// {20,48,52}, {24,45,51}, {30,40,50}
// For which value of p ≤ n, is the number of solutions maximized?

function intRightTriangles(n) {

    let solutions = {};
    let maxSolution = 0;
    let maxP = 0;

    // the minimum valid combo is 3^2 + 4^2 = 5^2 so p = 3 + 4 + 5 = 12
    for (let p = 12; p <= n; p++) {
        // p = a + b + c  && a^2 + b^2 = c^2
        // if a = b then p = a(2 + Math.sqert(2)) so 'a' cannot be bigger then this limit
        let limit = p / (2 + Math.sqrt(2))

        for (let a = 3; a <= limit; a++) {
            // a^2 + b^2 = c^2 && p = a + b + c
            // a^2 + b^2 = (p - a - b)^2 
            // b = p(p-2a) / 2(p-a) so b can calculated from 'p' and 'a'
            let b = p * (p - 2 * a) / (2 * (p - a));

            // check if 'b' is integer  
            if (Number.isInteger(b)) {
                // get 'c' based on 'a' and 'b'
                let c = p - a - b;

                // check if 90-degree triangle
                if (c * c === a * a + b * b) {
                    let solution = (solutions[p] || 0) + 1;
                    solutions[p] = solution;

                    if (solution > maxSolution) {
                        maxSolution = solution;
                        maxP = p;
                    }
                }
            }
        }
    }
    return maxP;
}

console.log(intRightTriangles(500), 420);
console.log(intRightTriangles(800), 720);
console.log(intRightTriangles(900), 840);
console.log(intRightTriangles(1000), 840);