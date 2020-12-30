// https://www.codewars.com/kata/59ce11ea9f0cbc8a390000ed
// The prime number sequence starts with: 2,3,5,7,11,13,17,19.... Notice that 2 is in position one.
// 3 occupies position two, which is a prime-numbered position. Similarly, 5, 11 and 17 also occupy prime-numbered positions. We shall call primes such as 3,5,11,17 dominant primes because they occupy prime-numbered positions in the prime number sequence. Let's call this listA.
// As you can see from listA, for the prime range range(0,10), there are only two dominant primes (3 and 5) and the sum of these primes is: 3 + 5 = 8.
// Similarly, as shown in listA, in the range (6,20), the dominant primes in this range are 11 and 17, with a sum of 28.
// Given a range (a,b), what is the sum of dominant primes within that range? Note that a <= range <= b and b will not exceed 500000.


function solve(a, b) {

    // dominant primes holder
    let dominants = [];

    // generate primes up-to b
    let primes = new Uint8Array(b + 1);
    primes[0] = 1; primes[1] = 1; // 0 and 1 not prime

    let counter = 0;              // count how many primes we have seen
    let sum = 0;
    for (let i = 2; i <= b; i++) {
        if (primes[i] === 0) {
            counter++;
            for (let j = i + i; j <= b; j += i) {
                primes[j] = 1;
            }

            if (i >= a && primes[counter] === 0) {
                dominants.push(i);
                sum += i;
            }
        }
    }

    return sum;
}

console.log(solve(0, 10), 8);
console.log(solve(2, 200), 1080);
console.log(solve(3, 17), 36);
console.log(solve(200, 2000), 48132);
console.log(solve(500, 10000), 847039);
console.log(solve(4000, 450000), 806250440);