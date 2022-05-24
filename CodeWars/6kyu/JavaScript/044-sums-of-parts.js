// https://www.codewars.com/kata/5ce399e0047a45001c853c2b/

function parts_sums(ls) {
    res = []

    len = ls.length

    for (let i = 0; i < len; i++) {
        totalSum = ls.reduce( (t, v) => t += v);
        res.push(totalSum);
        ls.shift();
    }
    return res.push(0)

}

function parts_sums(ls) {
    if (ls.length === 0) return [0];
    res = []

    let totalSum = ls.reduce((t, v) => t += v, 0);
    let subSum = 0;
    res.push(totalSum);

    for (let i = 0; i < ls.length; i++) {
        subSum += ls[i];
        res.push(totalSum-subSum);
    }

    return res
}

// from Codwars other's solution
function parts_sums(ls) {
    res = []

    let totalSum = ls.reduce((t, v) => t += v);
    res.push(totalSum);

    for (let i = 0; i < ls.length; i++) {
        res.push(res[res.length-1]-ls[i]);
    }

    return res
}


console.log(parts_sums([0, 1, 3, 6, 10]), [20, 20, 19, 16, 10, 0]);