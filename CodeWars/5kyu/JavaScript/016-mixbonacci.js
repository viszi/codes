// https://www.codewars.com/kata/5811aef3acdf4dab5e000251
// Mix -nacci sequences using a given pattern p.
// Return the first n elements of the mixed sequence.
// 0  1  2  3  4  
// ----------+------------------
// fibonacci:| 0, 1, 1, 2, 3 ...
// padovan:  | 1, 0, 0, 1, 0 ...
// pell:     | 0, 1, 2, 5, 12 ...


function mixbonacci(pattern, length) {

    if (pattern.length === 0) return [];

    let result = [];

    //create an object which will hold the series names and their counter
    let seriesNextNumber = {};

    //iterate length times
    for (let i = 0; i < length; i++) {

        //the pattern will contain less elements as length so get the correct one
        let element = pattern[i % pattern.length];

        //check the series object for the actual number for the series or use 0
        seriesNextNumber[element] = seriesNextNumber[element] || 0

        //run the correct series with the number
        let func = element + "(" + seriesNextNumber[element] + ")";
        let number = eval(func);
        result.push(number);

        //increment the series number by 1
        seriesNextNumber[element]++;
    };

    return result;
}

function fib(k) {
    //Fibonacci numbers: F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.
    //0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817

    if (k === 0) return 0;
    let result = [0, 1];

    let n = 2;
    let f0 = 0;
    let f1 = 1;
    let fn;

    while (n < k + 1) {
        fn = f0 + f1;
        result.push(fn);
        n++;
        f0 = f1;
        f1 = fn;
    }

    return result.pop();
}

function pad(k) {
    //Padovan sequence (or Padovan numbers): a(n) = a(n-2) + a(n-3) with a(0) = 1, a(1) = a(2) = 0.
    //1, 0, 0, 1, 0, 1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12, 16, 21, 28, 37, 49, 65, 86, 114, 151, 200, 265, 351, 465, 616, 816, 1081, 1432, 1897, 2513, 3329, 4410, 5842, 7739, 10252, 13581, 17991, 23833, 31572, 41824, 55405, 73396, 97229, 128801, 170625

    if (k === 0) return 1;
    if (k === 1) return 0;
    let result = [1, 0, 0];

    let n = 3;
    let a0 = 1;
    let a1 = 0;
    let a2 = 0;
    let an;

    while (n < k + 1) {
        an = a1 + a0;
        result.push(an);
        n++;
        a0 = a1;
        a1 = a2;
        a2 = an;
    }

    return result.pop();
}

function jac(k) {
    // Jacobsthal sequence (or Jacobsthal numbers): a(n) = a(n-1) + 2*a(n-2), with a(0) = 0, a(1) = 1.
    // 0, 1, 1, 3, 5, 11, 21, 43, 85, 171, 341, 683, 1365, 2731, 5461, 10923, 21845, 43691, 87381, 174763, 349525, 699051, 1398101, 2796203, 5592405, 11184811, 22369621, 44739243, 89478485, 178956971, 357913941, 715827883, 1431655765, 2863311531

    if (k === 0) return 0;
    let result = [0, 1];

    let n = 2;
    let a0 = 0;
    let a1 = 1;
    let an;

    while (n < k + 1) {
        an = a1 + 2 * a0;
        result.push(an);
        n++;
        a0 = a1;
        a1 = an;
    }

    return result.pop();
}

function pel(k) {
    // Pell numbers: a(0) = 0, a(1) = 1; for n > 1, a(n) = 2*a(n-1) + a(n-2).
    // 0, 1, 2, 5, 12, 29, 70, 169, 408, 985, 2378, 5741, 13860, 33461, 80782, 195025, 470832, 1136689, 2744210, 6625109, 15994428, 38613965, 93222358, 225058681, 543339720, 1311738121, 3166815962, 7645370045, 18457556052

    if (k === 0) return 0;
    let result = [0, 1];

    let n = 2;
    let a0 = 0;
    let a1 = 1;
    let an;

    while (n < k + 1) {
        an = 2 * a1 + a0;
        result.push(an);
        n++;
        a0 = a1;
        a1 = an;
    }

    return result.pop();
}

function tri(k) {
    // Tribonacci numbers: a(n) = a(n-1) + a(n-2) + a(n-3) for n >= 3 with a(0) = a(1) = 0 and a(2) = 1.
    // 0, 0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149, 274, 504, 927, 1705, 3136, 5768, 10609, 19513, 35890, 66012, 121415, 223317, 410744, 755476, 1389537, 2555757, 4700770, 8646064, 15902591, 29249425, 53798080, 98950096, 181997601,

    if (k < 2) return 0;
    let result = [0, 0, 1];

    let n = 3;
    let a0 = 0;
    let a1 = 0;
    let a2 = 1;
    let an;

    while (n < k + 1) {
        an = a2 + a1 + a0;
        result.push(an);
        n++;
        a0 = a1;
        a1 = a2;
        a2 = an;
    }

    return result.pop();
}

function tet(k) {
    // Tetranacci numbers: a(n) = a(n-1) + a(n-2) + a(n-3) + a(n-4) for n >= 4 with a(0) = a(1) = a(2) = 0 and a(3) = 1.
    // 0, 0, 0, 1, 1, 2, 4, 8, 15, 29, 56, 108, 208, 401, 773, 1490, 2872, 5536, 10671, 20569, 39648, 76424, 147312, 283953, 547337, 1055026, 2033628, 3919944, 7555935, 14564533, 28074040, 54114452, 104308960, 201061985, 387559437,

    if (k < 3) return 0;
    let result = [0, 0, 0, 1];

    let n = 4;
    let a0 = 0;
    let a1 = 0;
    let a2 = 0;
    let a3 = 1;
    let an;

    while (n < k + 1) {
        an = a3 + a2 + a1 + a0;
        result.push(an);
        n++;
        a0 = a1;
        a1 = a2;
        a2 = a3;
        a3 = an;
    }

    return result.pop();
}


// console.log(mixbonacci([], 10), []);
// console.log(mixbonacci(['fib'], 0), []);
// console.log(mixbonacci(['fib'], 10), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
// console.log(mixbonacci(['pad'], 10), [1, 0, 0, 1, 0, 1, 1, 1, 2, 2]);
// console.log(mixbonacci(['jac'], 10), [0, 1, 1, 3, 5, 11, 21, 43, 85, 171]);
// console.log(mixbonacci(['pel'], 10), [0, 1, 2, 5, 12, 29, 70, 169, 408, 985]);
// console.log(mixbonacci(['tri'], 10), [0, 0, 1, 1, 2, 4, 7, 13, 24, 44]);
// console.log(mixbonacci(['tet'], 10), [0, 0, 0, 1, 1, 2, 4, 8, 15, 29]);
// console.log(mixbonacci(['fib', 'tet'], 10), [0, 0, 1, 0, 1, 0, 2, 1, 3, 1]);
console.log(mixbonacci(['jac', 'jac', 'pel'], 10), [0, 1, 0, 1, 3, 1, 5, 11, 2, 21]);


const mixbonacci = (pattern, length) => {
    const gen = (fn, a) => () => (a.push(fn(a)), a.shift());
  
    const fns = {
      fib: gen(([a, b]) => a + b, [0, 1]),
      pad: gen(([a, b]) => a + b, [1, 0, 0]),
      jac: gen(([a, b]) => 2 * a + b, [0, 1]),
      pel: gen(([a, b])=> a + 2 * b, [0, 1]),
      tri: gen(([a, b, c]) => a + b + c, [0, 0, 1]),
      tet: gen(([a, b, c, d]) => a + b + c + d, [0, 0, 0, 1]),
    }
  
    return pattern.length
      ? Array.from(
        {length}, 
        (_,i) => fns[pattern[i % pattern.length]]())
      : []
  }