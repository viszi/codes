// https://www.codewars.com/kata/59ae589c07157afba80000a7
// - Your code needs to be as short as possible, in fact not longer than 28 characters
// - Because you are scared and stressed you have forgotten how to use the standard reverse() method

// 44 characters
weirdReverse=a=>a.reduce((r,c)=>[c,...r],[])

// 28 chars - accepted by Codewars
weirdReverse=a=>a.sort(_=>1)

console.log(weirdReverse([1, 2, 3, 4, 5]));