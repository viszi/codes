// https://www.codewars.com/kata/54ff3102c1bad923760001f3
// Return the number (count) of vowels in the given string.
// We will consider a, e, i, o, u as vowels for this Kata (but not y).
// The input string will only consist of lower case letters and/or spaces.

function getCount(str) {
  let vowelsCount = 0;

  // create the array for the vowels
  let vowels = ["a", "e", "i", "o", "u"];

  // loop through the string chars and check if the char is meember of the vowels array
  for (let i = 0; i < str.length; i += 1) {
    vowelsCount += (vowels.indexOf(str[i]) > -1);
  }

  return vowelsCount;
}

console.log("abracadabra: 5 ");
console.log(getCount("abracadabra"));