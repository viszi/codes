// https://www.codewars.com/kata/526d84b98f428f14a60008da
// A Hamming number is a positive integer of the form 2^i*3^j*5^k, for some non-negative integers i, j, and k.
// 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 25, 27, 30, 32, 36, 40, 45, 48, 50, 54, 60
// Write a function that computes the nth smallest Hamming number.
console.time('r');
// this version is timing out - cannot generate hamming(600) or more
function hamming(n) {
    if (n === 1) return 1;

    // the worst case is that we have to generate 2*n numbers
    boundary = 1700000;

    let table = Array(boundary).fill(0);

    // basic scenarios
    table[1] = 1;
    table[2] = 1;
    table[3] = 1;
    table[5] = 1;

    let bases = [2, 3, 5];
    let counter = 1;

    // loop through the array
    for (let i = 2; i <= boundary; i++) {

        // if the current number is a product of 2 / 3 / 5 then we have to 
        // mark all numbers which are multiplication of 2 / 3 / 5 of this number
        if (table[i] === 1) {
            bases.forEach(base => {
                const maxPower = Math.log10(boundary) / Math.log10(base);
                for (c = 1; c < maxPower; c++) {
                    table[i * base ** c] = 1;
                }
            })
            counter++;
        }

        if (counter === n) {
            return i;
        }
    }
}

// https://www.youtube.com/watch?v=xlpImBhS1ZE
function hamming(n) {

    let hn = [];
    let hn_set = new Set();

    let i2 = 0;     // exponental iterator of base 2 in Hamming number 
    let i3 = 0;     // exponental iterator of base 3 in Hamming number
    let i5 = 0;     // exponental iterator of base 5 in Hamming number

    let next2mul = 2;
    let next3mul = 3;
    let next5mul = 5;

    let next = 1;

    hn[0] = next;
    hn_set.add(next);
    let i = 1;

    while (hn_set.size < n) {
        next = Math.min(next2mul, next3mul, next5mul);  // next Hamming number
        hn[i] = next;
        hn_set.add(next);

        if (next === next2mul) {
            i2++;
            next2mul = hn[i2] * 2;
        } else if (next === next3mul) {
            i3++;
            next3mul = hn[i3] * 3;
        } else {
            i5++;
            next5mul = hn[i5] * 5;
        }
        i++;
    }
    return next;
}

// this version times out on Codewars
function hamming(n) {
    let size = Math.ceil(Math.cbrt(n));

    let merge = new Set();

    // add to set the generated Hamming numbers
    for (let i = 0; i < size * 6; i++) {
        for (let j = 0; j < size * 3; j++) {
            for (let k = 0; k < size * 2; k++) {
                merge.add(2 ** i * 3 ** j * 5 ** k);
            }
        }
    }

    // sort the generated numbers
    merge = [...merge].sort((a, b) => a - b);
    return merge[n - 1];
}

// this working answer is not my code
function hamming(n) {
    let seq = [1];
    let i2 = 0, i3 = 0, i5 = 0;
    for (let i = 1; i < n; i++) {
        let x = Math.min(2 * seq[i2], 3 * seq[i3], 5 * seq[i5]);
        seq.push(x);
        if (2 * seq[i2] <= x) i2++;
        if (3 * seq[i3] <= x) i3++;
        if (5 * seq[i5] <= x) i5++;
    }
    return seq[n - 1];
}


//console.log(hamming(1), 1);
console.log(hamming(14), 20);
// console.log(hamming(19), 32);
// console.log(hamming(176), 10125);
// console.log(hamming(256), 43200);
// console.log(hamming(560), 1679616);
// console.log(hamming(1000), 51200000);
// console.log(hamming(1500), 859963392);
// console.log(hamming(2000), 8062156800);
console.log(hamming(5000), 50837316566580); //?

console.timeEnd('r');
// run times    1st version         2nd version          3rd version
// 1            8 ms   / 0 steps    8 ms    / 1              8 ms
// 14           78 ms  / 377        8 ms    / 21             8 ms
// 19           72 ms  / 522        10 ms   / 36             8 ms
// 176          88 ms  / 5,075      13 ms   / 13,217        30 ms
// 256          242 ms / 7,650      16 ms   / 57,059        40 ms
// 560          20 s   / 22,919     107 ms  / 2,602,242     60 ms
// 1000                             3 s     / 88,208,724   100 ms
// 1500                                                    147 ms
// 2000                                                    150 ms
// 5000                                                    200 ms