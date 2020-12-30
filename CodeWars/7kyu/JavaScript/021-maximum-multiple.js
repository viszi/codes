// https://www.codewars.com/kata/5aba780a6a176b029800041c
// Given a Divisor and a Bound , Find the largest integer N , Such That ,
// N is divisible by divisor
// N is less than or equal to bound
// N is greater than 0.

function maxMultiple(divisor, bound) {
  return Math.floor(bound / divisor) * divisor;
}