// https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-9-special-pythagorean-triplet
// Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
// a^2 + b^2 = c^2
// For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.
// There exists exactly one Pythagorean triplet for which a + b + c = 1000. Find the product abc such that a + b + c = n.

function specialPythagoreanTriplet(n) {

    for (let a = 1; a < n; a++) {
        for (let b = a + 1; b < n - a; b++) {
            const c = n - a - b;

            if (c ** 2 === a ** 2 + b ** 2) {
                return a * b * c;
            }
        }
    }

    return 0;
}

console.log(specialPythagoreanTriplet(24), 480);
console.log(specialPythagoreanTriplet(120), "49920, 55080 or 60000");
console.log(specialPythagoreanTriplet(1000), 31875000);