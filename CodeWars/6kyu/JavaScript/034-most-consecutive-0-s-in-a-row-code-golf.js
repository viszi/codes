// https://www.codewars.com/kata/5b901127d0093853470001e7
// Your program must find the longest sequence of consecutive zeroes in an integer number.
// For example, the number 10002030000 has three sequences of zeroes with lengths 3, 1 and 4. So the longest sequence is 4.

f=i=>Math.max(...(''+i).split(/[^0]/).map(v=>v.length))

