// https://www.codewars.com/kata/596d34df24a04ee1e3000a25

// brute force version
function countOnes(left, right) {
    sum = 0;
    for(let i = left; i <= right; i++) {
        sum += i.toString(2).replace(/0/g,'').length;
        //console.log(`num: ${i}, binary: ${i.toString(2)}, sum: ${i.toString(2).replace(/0/g,'').length}`)
    }
    return sum
}


function countOnes(left, right) {
    t = '';
    for(let i = left; i <= right; i++) {
        t += i.toString(2);
    }
    return t.split('0').join('').length
}

console.log(countOnes(4, 7), 8);
// console.log(countOnes(1, 9));
// console.log(countOnes(10, 19));
// console.log(countOnes(100, 109));
//console.log(countOnes(10, 99));
//console.log(countOnes(4, 700));
//console.log(countOnes(282512, 700647));